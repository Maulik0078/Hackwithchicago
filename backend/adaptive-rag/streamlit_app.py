import streamlit as st
import requests

st.set_page_config(page_title="RAG Query App", layout="centered")
st.title("📚 RAG Document Assistant")

# Input fields
query = st.text_area("Enter your question", height=100)
k = st.slider("Number of chunks to retrieve (k)", min_value=1, max_value=10, value=3)

if st.button("Get Answer"):
    if not query.strip():
        st.warning("Please type a question before submitting.")
    else:
        with st.spinner("Fetching answers..."):
            # Call your Flask RAG endpoint
            resp = requests.post(
                "http://localhost:8003/rag_query",
                json={"prompt": query, "k": k}
            ).json()
            answer = resp.get("response", "No answer returned.")
            sources = resp.get("sources", [])

        # Show the LLM’s answer
        st.subheader("Answer")
        st.write(answer)

        # Show the source chunks
        if sources:
            st.subheader("Sources")
            for i, chunk in enumerate(sources, 1):
                path = chunk.get("metadata", {}).get("path", "unknown source")
                st.markdown(f"**Source {i}:** {path}")
                st.write(chunk.get("text", ""))
