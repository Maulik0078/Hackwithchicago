# import logging

# import pathway as pw
# from dotenv import load_dotenv
# from pathway.xpacks.llm.question_answering import SummaryQuestionAnswerer
# from pathway.xpacks.llm.servers import QASummaryRestServer
# from pydantic import BaseModel, ConfigDict, InstanceOf

# # To use advanced features with Pathway Scale, get your free license key from
# # https://pathway.com/features and paste it below.
# # To use Pathway Community, comment out the line below.
# pw.set_license_key("demo-license-key-with-telemetry")

# logging.basicConfig(
#     level=logging.INFO,
#     format="%(asctime)s %(name)s %(levelname)s %(message)s",
#     datefmt="%Y-%m-%d %H:%M:%S",
# )

# load_dotenv()


# class App(BaseModel):
#     question_answerer: InstanceOf[SummaryQuestionAnswerer]
#     host: str = "0.0.0.0"
#     port: int = 8000

#     with_cache: bool = True
#     terminate_on_error: bool = False

#     def run(self) -> None:
#         server = QASummaryRestServer(self.host, self.port, self.question_answerer)
#         server.run(
#             with_cache=self.with_cache,
#             terminate_on_error=self.terminate_on_error,

#         )

#     model_config = ConfigDict(extra="forbid")


# if __name__ == "__main__":
#     with open("app.yaml") as f:
#         config = pw.load_yaml(f)
#     app = App(**config)
#     app.run()



import requests, logging, os
from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Optional: OpenAI API key from .env
openai_api_key = os.getenv("OPENAI_API_KEY")

@app.route("/rag_query", methods=["POST"])
def rag_query():
    data = request.json
    prompt = data.get("prompt", "")
    top_k = data.get("k", 3)

    # Query PDF Source
    pdf_response = requests.post(
        "http://localhost:8000/v1/retrieve",
        json={"query": prompt, "k": top_k},
    ).json()

    # Query CSV Source
    csv_response = requests.post(
        "http://localhost:8001/v1/retrieve",
        json={"query": prompt, "k": top_k},
    ).json()

    # # Combine contexts
    # combined_chunks = pdf_response.get("chunks", []) + csv_response.get("chunks", [])
    # context = "\n\n".join([chunk["text"] for chunk in combined_chunks[:top_k]])

    pdf_chunks = pdf_response if isinstance(pdf_response, list) else pdf_response.get("chunks", [])
    csv_chunks = csv_response if isinstance(csv_response, list) else csv_response.get("chunks", [])
    combined_chunks = pdf_chunks + csv_chunks
    context = "\n\n".join([chunk["text"] for chunk in combined_chunks[:top_k]])

    # Final prompt to OpenAI
    final_prompt = f"Use the following documents to answer the question:\n\n{context}\n\nQuestion: {prompt}"

    client = OpenAI(api_key=openai_api_key)
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert document assistant."},
            {"role": "user", "content": final_prompt},
        ],
        temperature=0
    )

    return jsonify({
        "response": completion.choices[0].message.content,
        "sources": combined_chunks
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)