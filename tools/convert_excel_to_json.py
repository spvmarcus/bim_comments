import pandas as pd
import json

df = pd.read_excel("excel/template.xlsx")
df["linha_id"] = df.index + 2  # assume header na linha 1

df.to_json("docs/data.json", orient="records", indent=2)
