# Name: Kimberley Boersma
# Student no: 11003464
# Python file to process data and write to jsonfiles

import csv
import json
import numpy as np
import pandas as pd

INPUT_FILE = "../data/globalterrorism.csv"

def process_data(filename):
    # Process data into several dataframes and write to json files

    # Read original dataset and filter on useful columns
    df = pd.read_csv(filename, encoding='latin-1', usecols=["eventid", "iyear", "imonth", "iday", "extended", "country", "country_txt", "region", "region_txt", "provstate", "city", "latitude", "longitude", "suicide", "attacktype1", "attacktype1_txt", "targtype1", "targtype1_txt", "targsubtype1", "targsubtype1_txt", "corp1", "target1", "natlty1", "natlty1_txt", "gname", "gsubname", "motive", "individual", "claimed", "weaptype1", "weaptype1_txt", "nkill", "nkillus", "nkillter", "nwound", "nwoundus", "nwoundte"])

    # Filter data for period 1990-2017
    df = df.loc[df['iyear'].isin(range(1990, 2018))]

    # Number of terrorist incidents per year and per country
    country = df.groupby(['iyear', 'country_txt']).size().reset_index(name='count')

    # Groups behind attacks per year, per country (in percentages)
    group = df.groupby(['iyear', 'country_txt', 'gname']).size().reset_index(name='frequency')
    group = group.set_index(['iyear', 'country_txt', 'gname'])
    group['percentage'] = group.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    group = group.reset_index()

    # Number of killed and wounded per year, per country
    killsandwound = df.groupby(['iyear', 'country_txt']).sum()[['nkill']].add_prefix('sum_')
    killsandwound['sum_nwound'] = df.groupby(['iyear', 'country_txt']).sum()[['nwound']]
    killsandwound = killsandwound.reset_index()

    # Attacktypes used in attacks per year, per country (in percentages)
    attacktypes = df.groupby(['iyear', 'country_txt', 'attacktype1_txt']).size().reset_index(name='frequency')
    attacktypes = attacktypes.set_index(['iyear', 'country_txt', 'attacktype1_txt'])
    attacktypes['percentage'] = attacktypes.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    attacktypes = attacktypes.reset_index()

    # Target types per year, per country (in percentages)
    targettypes = df.groupby(['iyear', 'country_txt', 'targtype1_txt']).size().reset_index(name='frequency')
    targettypes = targettypes.set_index(['iyear', 'country_txt', 'targtype1_txt'])
    targettypes['percentage'] = targettypes.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    targettypes = targettypes.reset_index()

    # Weapons used during attacks per year, per country (in percentages)
    weapontypes = df.groupby(['iyear', 'country_txt', 'weaptype1_txt']).size().reset_index(name='frequency')
    weapontypes = weapontypes.set_index(['iyear', 'country_txt', 'weaptype1_txt'])
    weapontypes['percentage'] = weapontypes.groupby(level=[0, 1]).apply(lambda g: g / g.sum())
    weapontypes = weapontypes.reset_index()

    # Write all dataframes to jsonfiles
    group.to_json("../data/json/group.json", orient='index')
    country.to_json("../data/json/country.json", orient='index')
    killsandwound.to_json("../data/json/killsandwound.json", orient='index')
    attacktypes.to_json("../data/json/attacktypes.json", orient="index")
    targettypes.to_json("../data/json/targettypes.json", orient="index")
    weapontypes.to_json("../data/json/weapontypes.json", orient="index")

if __name__ == '__main__':
    process_data(INPUT_FILE)
