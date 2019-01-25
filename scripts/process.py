import csv
import json
import numpy as np
import pandas as pd

INPUT_FILE = "../data/csv/globalterrorism.csv"
OUTPUT_FILE = "../data/json/globalterrorismcopy.json"

def create_df(filename):
    df = pd.read_csv(filename, encoding='latin-1', usecols=["eventid", "iyear", "imonth", "iday", "extended", "country", "country_txt", "region", "region_txt", "provstate", "city", "latitude", "longitude", "crit1", "crit2", "crit3", "doubtterr", "alternative", "alternative_txt", "multiple", "success", "suicide", "attacktype1", "attacktype1_txt", "targtype1", "targtype1_txt", "targsubtype1", "targsubtype1_txt", "corp1", "target1", "natlty1", "natlty1_txt", "gname", "gsubname", "motive", "individual", "claimed", "weaptype1", "weaptype1_txt", "weapsubtype1", "weapsubtype1_txt", "weapdetail", "nkill", "nkillus", "nkillter", "nwound", "nwoundus", "nwoundte", "property", "propextent", "propextent_txt", "propvalue", "ishostkid", "nhostkid", "nhostkidus", "hostkidoutcome", "hostkidoutcome_txt", "INT_LOG", "INT_IDEO", "INT_MISC", "INT_ANY"])
    # df1 = df.set_index('eventid').to_json(OUTPUT_FILE2, orient='index')
    df = df.loc[df['iyear'].isin(range(1990, 2018))]
    country = df.groupby(['iyear', 'country_txt']).size().reset_index(name='count')
    group = df.groupby(['iyear', 'country_txt', 'gname']).size().reset_index(name='frequency')
    group = group.set_index(['iyear', 'country_txt', 'gname'])
    group['percentage'] = group.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    group = group.reset_index()
    killsandwound = df.groupby(['iyear', 'country_txt']).sum()[['nkill']].add_prefix('sum_')
    killsandwound['sum_nwound'] = df.groupby(['iyear', 'country_txt']).sum()[['nwound']]
    killsandwound = killsandwound.reset_index()
    attacktypes = df.groupby(['iyear', 'country_txt', 'attacktype1_txt']).size().reset_index(name='frequency')
    attacktypes = attacktypes.set_index(['iyear', 'country_txt', 'attacktype1_txt'])
    attacktypes['percentage'] = attacktypes.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    attacktypes = attacktypes.reset_index()
    print(attacktypes.head())
    targettypes = df.groupby(['iyear', 'country_txt', 'targtype1_txt']).size().reset_index(name='frequency')
    targettypes = targettypes.set_index(['iyear', 'country_txt', 'targtype1_txt'])
    targettypes['percentage'] = targettypes.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    targettypes = targettypes.reset_index()
    print(targettypes.head())
    weapontypes = df.groupby(['iyear', 'country_txt', 'weaptype1_txt']).size().reset_index(name='frequency')
    weapontypes = weapontypes.set_index(['iyear', 'country_txt', 'weaptype1_txt'])
    weapontypes['percentage'] = weapontypes.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    weapontypes = weapontypes.reset_index()
    print(weapontypes.head())
    success = df.groupby(['iyear', 'country_txt', 'success']).size().reset_index(name='frequency')
    print(success.head())
    # df2 = df2.apply(lambda x: x/x.sum()).reset_index()
    # df2 = df2.apply(lambda g: g / g.sum())
    # df2 = df2.groupby(['iyear', 'country_txt', 'gname']).agg({'count': 'sum'})
    # df2.loc[:,'percentage'] = groupname.groupby(level=0).apply(lambda x: x/x.sum())
    group.to_csv("../data/csv/group.csv")
    group.to_json("../data/json/group.json", orient='index')
    country.to_csv("../data/csv/country.csv")
    country.to_json("../data/json/country.json", orient='index')
    killsandwound.to_csv("../data/csv/killsandwound.csv")
    killsandwound.to_json("../data/json/killsandwound.json", orient='index')
    attacktypes.to_csv("../data/csv/attacktypes.csv")
    attacktypes.to_json("../data/json/attacktypes.json", orient="index")
    targettypes.to_csv("../data/csv/targettypes.csv")
    targettypes.to_json("../data/json/targettypes.json", orient="index")
    weapontypes.to_csv("../data/csv/weapontypes.csv")
    weapontypes.to_json("../data/json/weapontypes.json", orient="index")
    success.to_csv("../data/csv/success.csv")
    success.to_json("../data/json/success.json", orient="index")

if __name__ == '__main__':
    create_df(INPUT_FILE)
