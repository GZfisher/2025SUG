#!/usr/bin/env python3
import os
import sys
import subprocess

def extract_text_from_pdf(pdf_path, output_dir):
    """Extract text from PDF using pdftotext if available, otherwise use a pure Python approach."""
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Try using PyPDF2 as a fallback
    try:
        from PyPDF2 import PdfReader
        print(f"Using PyPDF2 to extract text from {pdf_path}")
        
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        
        # Process each page
        for i in range(total_pages):
            page = reader.pages[i]
            text = page.extract_text()
            
            # Write to file
            output_path = os.path.join(output_dir, f"page_{i+1}.txt")
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(text)
                
            # Print first 100 chars as preview
            preview = text[:100].replace('\n', ' ')
            print(f"Extracted page {i+1}/{total_pages}: {preview}...")
            
        print(f"Text extracted to {output_dir}")
        return True
    
    except ImportError:
        print("PyPDF2 not available. Trying an alternative approach...")
        pass
    
    # If all else fails, use a very simple approach to extract some text
    try:
        # Use strings command which is available on most systems
        print("Using 'strings' command to extract text (limited formatting)")
        
        output_path = os.path.join(output_dir, "extracted_text.txt")
        with open(output_path, "w") as f:
            subprocess.run(["strings", pdf_path], stdout=f, text=True)
            
        print(f"Raw text extracted to {output_path}")
        return True
        
    except Exception as e:
        print(f"Error extracting text: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python pdf_to_text.py <pdf_file_path>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    if not os.path.exists(pdf_path):
        print(f"Error: File {pdf_path} doesn't exist")
        sys.exit(1)
        
    output_dir = pdf_path.rsplit(".", 1)[0] + "_text"
    
    success = extract_text_from_pdf(pdf_path, output_dir)
    if not success:
        print("Failed to extract text from PDF")
        sys.exit(1)