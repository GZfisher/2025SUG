# utils.py
import streamlit as st
import os

def get_ordered_pages():
    """
    Reads all .py files under the 'pages' directory, sorts them by filename,
    and constructs an ordered list of pages, including the home page.
    Returns a list of dictionaries, each containing the page's file path,
    button display title, and URL parameter name.
    """
    pages_dir = "./pages"
    # Ensure the 'pages' directory exists
    if not os.path.exists(pages_dir):
        st.error(f"Error: The directory '{pages_dir}' was not found. Please create it and place your page files inside.")
        return []

    # Get all .py files in the pages directory and sort them
    # Exclude files starting with '__' (e.g., __init__.py)
    page_files = sorted([f for f in os.listdir(pages_dir) if f.endswith(".py") and not f.startswith("__")])

    # First, add the home page configuration
    pages_list = [
        {"file": "0_Home.py", "title": "Home", "url_name": None, 'number': -999} # None means the home page doesn't have a 'p' parameter
    ]

    for f in page_files:
        # For filenames like 'X_My_Page.py', Streamlit's sidebar will show 'My Page',
        # and the URL parameter will be 'My_Page'.
        # We need to extract the correct URL parameter name and display title.
        parts = f.split('_', 1) # Split only at the first '_'
        number = int(f.split('_')[0])
        if len(parts) > 1 and parts[0].isdigit(): # If the filename starts with a number_ (e.g., 1_Introduction.py)
            url_name_raw = parts[1].replace(".py", "")
            url_name = url_name_raw # Streamlit URL parameters retain underscores
            title = url_name_raw.replace("_", " ") # Button display title replaces underscores with spaces
        else: # For files without a numeric prefix (e.g., Extra_Analysis.py)
            url_name = f.replace(".py", "")
            title = url_name.replace("_", " ")

        pages_list.append({"file": os.path.join(pages_dir, f).replace("\\", "/"), "title": title, "url_name": url_name, 'number':number})
    ordered_pages = sorted(pages_list, key=lambda page: page['number'])
    return ordered_pages

def create_navigation_buttons(current_script_file: str, id = ''):
    """
    Creates "Previous" and "Next" buttons to navigate between Streamlit pages.

    Args:
        current_script_file: The absolute path of the current page's script file (__file__).
                             Used to determine the current page's position in the sequence.
    """
    ordered_pages = get_ordered_pages()

    # Convert the absolute path of the current script to its relative path
    # as stored in st.Page.script_path.
    # This assumes the Streamlit app is run from its root directory.
    # On Windows, os.path.relpath might return paths with backslashes.
    # st.Page.script_path always uses forward slashes.
    app_root = os.getcwd()
    current_relative_path = os.path.relpath(current_script_file, app_root).replace("\\", "/")


    # Find the index of the current page in the ordered list
    current_page_idx = -1
    for i, page in enumerate(ordered_pages):
        # Compare normalized paths
        if page['file'] == current_relative_path:
            current_page_idx = i
            break

    if current_page_idx == -1:
        st.warning(f"Error: Current page script '{current_relative_path}' not found in registered pages. Navigation buttons may not work correctly.")
        st.info("Please ensure your page files are correctly placed in the 'pages' directory and the main script is at the app root.")
        return
    
    # st.markdown("---") # Add a separator below the buttons
    # Use Streamlit's columns to lay out the buttons
    col1, col2, col3 = st.columns([1, 4, 1])
    
    with col1:
        if current_page_idx > 0: # If not the first page, show "Previous" button
            prev_page = ordered_pages[current_page_idx - 1]
            if st.button(f"⬅️ Previous: {prev_page['title']}", use_container_width=True, key=f"previous-{id}"):
                # CORRECT: Use st.switch_page()
                st.switch_page(prev_page['file'])

    with col3:
        if current_page_idx < len(ordered_pages) - 1: # If not the last page, show "Next" button
            next_page = ordered_pages[current_page_idx + 1]
            if st.button(f"Next: {next_page['title']} ➡️", use_container_width=True, key=f"next-{id}"):
                # CORRECT: Use st.switch_page()
                st.switch_page(next_page['file'])

    # st.markdown("---") # Add a separator below the buttons
