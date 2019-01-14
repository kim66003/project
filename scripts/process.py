import csv
import json
import numpy as np
import pandas as pd

INPUT_FILE = "../data/globalterrorism.csv"
OUTPUT_FILE = "../data/output.csv"
OUTPUT_FILE2 = "../data/globalterrorism.json"
OUTPUT_FILE_copy = "../data/globalterrorismcopy.json"

def create_dataframe(filename):
    dataframe = pd.read_csv(filename, encoding='latin-1', usecols=["eventid", "iyear", "imonth", "iday", "extended", "country", "country_txt", "region", "region_txt", "provstate", "city", "latitude", "longitude", "crit1", "crit2", "crit3", "doubtterr", "alternative", "alternative_txt", "multiple", "success", "suicide", "attacktype1", "attacktype1_txt", "targtype1", "targtype1_txt", "targsubtype1", "targsubtype1_txt", "corp1", "target1", "natlty1", "natlty1_txt", "gname", "gsubname", "motive", "individual", "claimed", "weaptype1", "weaptype1_txt", "weapsubtype1", "weapsubtype1_txt", "weapdetail", "nkill", "nkillus", "nkillter", "nwound", "nwoundus", "nwoundte", "property", "propextent", "propextent_txt", "propvalue", "ishostkid", "nhostkid", "nhostkidus", "hostkidoutcome", "hostkidoutcome_txt", "INT_LOG", "INT_IDEO", "INT_MISC", "INT_ANY"])
    # dataframe = dataframe.loc[dataframe['iyear'].isin(range(2000, 2018))]
    # dataframe = dataframe.to_csv(OUTPUT_FILE)
    # dataframe1 = dataframe.set_index('eventid').to_json(OUTPUT_FILE2, orient='index')
    dataframe = dataframe.loc[dataframe['iyear'].isin(range(2000, 2018))]
    #dataframe1 = dataframe.to_csv("../data/test.csv")
    group = dataframe.groupby(['iyear', 'country_txt', 'gname']).size().reset_index(name='count')
    country = dataframe.groupby(['iyear', 'country_txt']).size().reset_index(name='count')
    # country = country.set_index(['iyear', 'country_txt'])
    group = group.set_index(['iyear', 'country_txt', 'gname'])
    group['percentage'] = group.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    group = group.reset_index()


    # dataframe2['percentage'] =
    # dataframe2 = dataframe2['count'].sum()
    # dataframe2 = dataframe2.apply(lambda x: x/x.sum()).reset_index()
    # dataframe2 = dataframe2.apply(lambda g: g / g.sum())
    # dataframe2 = dataframe2.groupby(['iyear', 'country_txt', 'gname']).agg({'count': 'sum'})
    # dataframe2.loc[:,'percentage'] = groupname.groupby(level=0).apply(lambda x: x/x.sum())
    group.to_csv("../data/group.csv")
    group.to_json("../data/group.json", orient='index')
    country.to_csv("../data/country.csv")
    country.to_json("../data/country.json", orient='index')
    # dataframe3 = dataframe.groupby(['iyear', 'country_txt']).size().reset_index(name='count')
    #dataframe4 = dataframe3.to_csv(OUTPUT_FILE)
    # dataframe2 = dataframe.set_index('eventid').to_json(OUTPUT_FILE_copy, orient='index')

    print(group.head())
    print(country.head())

if __name__ == '__main__':
    create_dataframe(INPUT_FILE)
