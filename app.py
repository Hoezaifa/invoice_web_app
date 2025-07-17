import streamlit as st
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle
from reportlab.lib.utils import ImageReader
from datetime import datetime
import tempfile
import os

PAGE_WIDTH, PAGE_HEIGHT = 600, 800
LOGO_PATH = "logo.png"

st.set_page_config(page_title="Invoice Generator", layout="centered")
st.title("🧾 Al Huzaifa Printers - Invoice Generator")

# --- Sidebar Inputs ---
with st.sidebar:
    st.header("Client Info")
    client_name = st.text_input("M/s (Client Name)", "")
    invoice_date = st.text_input("Date (optional)", datetime.now().strftime("%d-%m-%Y"))
    advance = st.text_input("Advance (optional)", "")

st.subheader("Add Item")
desc = st.text_input("Description")
col1, col2 = st.columns(2)
with col1:
    qty = st.text_input("Qty")
with col2:
    rate = st.text_input("Rate")

if "items" not in st.session_state:
    st.session_state["items"] = []

if st.button("➕ Add Item"):
    if not desc or not qty or not rate:
        st.warning("Fill all fields to add item.")
    else:
        try:
            amount = int(qty) * int(rate)
            st.session_state["items"].append([str(len(st.session_state["items"]) + 1), desc, qty, rate, str(amount)])
            st.success("Item added.")
        except ValueError:
            st.error("Qty and Rate must be numbers.")

# Show items
st.divider()
st.subheader("Items")
if st.session_state["items"]:
    st.table([["S.No", "Description", "Qty", "Rate", "Amount"]] + st.session_state["items"])
else:
    st.info("No items added yet.")

# Generate PDF button
if st.button("📄 Generate Invoice PDF"):
    if not client_name:
        st.error("Client name is required.")
    elif not st.session_state["items"]:
        st.error("Add at least one item.")
    else:
        total = sum([int(row[4]) for row in st.session_state["items"]])
        try:
            advance_val = int(advance) if advance else None
        except ValueError:
            st.error("Advance must be a number.")
            st.stop()

        balance = total - advance_val if advance_val is not None else None

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            filename = tmp_file.name

        c = canvas.Canvas(filename, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))
        logo = ImageReader(LOGO_PATH)
        c.drawImage(logo, 0, PAGE_HEIGHT - 174, width=600, height=174)

        c.setFont("Helvetica-Bold", 14)
        c.drawString(30, PAGE_HEIGHT - 190, f"M/s: {client_name}")
        c.drawRightString(PAGE_WIDTH - 30, PAGE_HEIGHT - 190, f"Date: {invoice_date}")

        table_data = [["S.No", "Description", "Qty", "Rate", "Amount"]] + st.session_state["items"]
        table_data.append(["", "", "", "", ""])  # Gap row

        summary_rows = [["Total", f"{total} PKR"]]
        if advance_val is not None:
            summary_rows.append(["Advance", f"{advance_val} PKR"])
            summary_rows.append(["Balance", f"{balance} PKR"])
        for label, val in summary_rows:
            table_data.append(["", "", "", label, val])

        col_widths = [50, 200, 60, 80, 80]
        table = Table(table_data, colWidths=col_widths)
        style = TableStyle([
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
            ("FONTSIZE", (0, 0), (-1, -1), 10),
            ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
        ])
        if advance_val is not None:
            for i in range(-len(summary_rows), 0):
                style.add("BACKGROUND", (3, i), (4, i), colors.lightgrey)
                style.add("FONTNAME", (3, i), (4, i), "Helvetica-Bold")
        table.setStyle(style)
        table_width = sum(col_widths)
        x_offset = (PAGE_WIDTH - table_width) / 2
        y_pos = PAGE_HEIGHT - 420
        table.wrapOn(c, 0, 0)
        table.drawOn(c, x_offset, y_pos)

        c.setFont("Helvetica-Bold", 11)
        footer_y = 60
        footer_lines = [
            "Shop # 50, Al Momin Plaza Burns Road Karachi, 03332054452",
            "Email: huzaifariaz1234@gmail.com"
        ]
        for line in footer_lines:
            c.drawCentredString(PAGE_WIDTH / 2, footer_y, line)
            footer_y -= 15

        c.save()

        with open(filename, "rb") as f:
            st.download_button("⬇️ Download Invoice", f, file_name=f"{client_name}_{invoice_date}.pdf")
