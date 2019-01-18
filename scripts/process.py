import csv
import json
import numpy as np
import pandas as pd

INPUT_FILE = "../data/globalterrorism.csv"
OUTPUT_FILE = "../data/output.csv"
OUTPUT_FILE2 = "../data/globalterrorism.json"
OUTPUT_FILE_copy = "../data/globalterrorismcopy.json"

def create_df(filename):
    df = pd.read_csv(filename, encoding='latin-1', usecols=["eventid", "iyear", "imonth", "iday", "extended", "country", "country_txt", "region", "region_txt", "provstate", "city", "latitude", "longitude", "crit1", "crit2", "crit3", "doubtterr", "alternative", "alternative_txt", "multiple", "success", "suicide", "attacktype1", "attacktype1_txt", "targtype1", "targtype1_txt", "targsubtype1", "targsubtype1_txt", "corp1", "target1", "natlty1", "natlty1_txt", "gname", "gsubname", "motive", "individual", "claimed", "weaptype1", "weaptype1_txt", "weapsubtype1", "weapsubtype1_txt", "weapdetail", "nkill", "nkillus", "nkillter", "nwound", "nwoundus", "nwoundte", "property", "propextent", "propextent_txt", "propvalue", "ishostkid", "nhostkid", "nhostkidus", "hostkidoutcome", "hostkidoutcome_txt", "INT_LOG", "INT_IDEO", "INT_MISC", "INT_ANY"])
    # df1 = df.set_index('eventid').to_json(OUTPUT_FILE2, orient='index')
    df = df.loc[df['iyear'].isin(range(2000, 2018))]
    print(df.head())
    country = df.groupby(['iyear', 'country_txt']).size().reset_index(name='count')
    print(country.head())
    group = df.groupby(['iyear', 'country_txt', 'gname']).size().reset_index(name='count')
    group = group.set_index(['iyear', 'country_txt', 'gname'])
    group['percentage'] = group.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    group = group.reset_index()
    print(group.head())
    killsandwound = df.groupby(['iyear', 'country_txt']).sum()[['nkill']].add_prefix('sum_')
    killsandwound['sum_nwound'] = df.groupby(['iyear', 'country_txt']).sum()[['nwound']]
    killsandwound = killsandwound.reset_index()

    print(killsandwound.head())

    # df2 = df2.apply(lambda x: x/x.sum()).reset_index()
    # df2 = df2.apply(lambda g: g / g.sum())
    # df2 = df2.groupby(['iyear', 'country_txt', 'gname']).agg({'count': 'sum'})
    # df2.loc[:,'percentage'] = groupname.groupby(level=0).apply(lambda x: x/x.sum())
    group.to_csv("../data/group.csv")
    group.to_json("../data/group.json", orient='index')
    country.to_csv("../data/country.csv")
    country.to_json("../data/country.json", orient='index')
    killsandwound.to_csv("../data/killsandwound.csv")
    killsandwound.to_json("../data/killsandwound.json", orient='index')

if __name__ == '__main__':
    create_df(INPUT_FILE)
