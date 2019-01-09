import csv
import json
import numpy as np
import pandas as pd

INPUT_FILE = "data/globalterrorism.csv"
OUTPUT_FILE = "data/output.csv"
OUTPUT_FILE2 = "data/globalterrorism.json"

def create_dataframe(filename):
    dataframe = pd.read_csv(filename, encoding='latin-1', usecols=["eventid", "iyear", "imonth", "iday", "extended", "country", "country_txt", "region", "region_txt", "provstate", "city", "latitude", "longitude", "crit1", "crit2", "crit3", "doubtterr", "alternative", "alternative_txt", "multiple", "success", "suicide", "attacktype1", "attacktype1_txt", "targtype1", "targtype1_txt", "targsubtype1", "targsubtype1_txt", "corp1", "target1", "natlty1", "natlty1_txt", "gname", "gsubname", "motive", "individual", "claimed", "weaptype1", "weaptype1_txt", "weapsubtype1", "weapsubtype1_txt", "weapdetail", "nkill", "nkillus", "nkillter", "nwound", "nwoundus", "nwoundte", "property", "propextent", "propextent_txt", "propvalue", "ishostkid", "nhostkid", "nhostkidus", "hostkidoutcome", "hostkidoutcome_txt", "INT_LOG", "INT_IDEO", "INT_MISC", "INT_ANY"])
    dataframe = dataframe.loc[dataframe['iyear'].isin(range(2000, 2018))]
    # dataframe = dataframe.to_csv(OUTPUT_FILE)
    dataframe = dataframe.set_index('eventid').to_json(OUTPUT_FILE2, orient='index')

    return dataframe

if __name__ == '__main__':
    df = create_dataframe(INPUT_FILE)
