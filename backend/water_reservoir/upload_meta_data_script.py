import os
import urllib.parse as up
import psycopg2
import requests
from datetime import date

def is_float(string):
    try:
        float(string)
        return True
    except ValueError:
        return False
def get_reservoir_meta_data(state_code):
    url = f'https://waterservices.usgs.gov/nwis/site/?format=rdb&stateCd={state_code}&parameterCd=00054&siteStatus=active'
    response = requests.get(url)
    data = response.text.split('\n')[28:]
    parsed_data = []
    for row in data:
        if not row.startswith('#'):
            row_data = row.split('\t')
            if not row_data[0]=='agency_cd' and not row_data[0]=='5s' and len(row_data)==12:
                dec_lat_va = float(row_data[4]) if is_float(row_data[4]) else None
                dec_long_va = float(row_data[5]) if is_float(row_data[5]) else None
                alt_va = float(row_data[8]) if is_float(row_data[8]) else None
                alt_acy_va = float(row_data[9]) if is_float(row_data[9]) else None
                parsed_data.append({
                    'agency_cd': row_data[0],
                    'site_no': row_data[1],
                    'station_nm': row_data[2],
                    'site_tp_cd': row_data[3],
                    'dec_lat_va': dec_lat_va,
                    'dec_long_va': dec_long_va,
                    'coord_acy_cd': row_data[6],
                    'dec_coord_datum_cd': row_data[7],
                    'alt_va': alt_va,
                    'alt_acy_va': alt_acy_va,
                    'alt_datum_cd': row_data[10],
                    'huc_cd': row_data[11]
                })
    return parsed_data

up.uses_netloc.append("postgres")
url = up.urlparse(os.environ["DATABASE_URL"])
conn = psycopg2.connect(database=url.path[1:],
user=url.username,
password=url.password,
host=url.hostname,
port=url.port
)

# get the latest reservoir data for each state
az_reservoir_data = get_reservoir_meta_data('az')
ca_reservoir_data = get_reservoir_meta_data('ca')
nm_reservoir_data = get_reservoir_meta_data('nm')

# insert the data into the database
cur = conn.cursor()
for data in az_reservoir_data:
    cur.execute("INSERT INTO meta_data (state_code, agency_cd, site_no, station_nm, site_tp_cd, dec_lat_va, dec_long_va, coord_acy_cd, dec_coord_datum_cd, alt_va, alt_acy_va, alt_datum_cd, huc_cd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                ('az',data['agency_cd'], data['site_no'], data['station_nm'], data['site_tp_cd'], data['dec_lat_va'], data['dec_long_va'], data['coord_acy_cd'], data['dec_coord_datum_cd'], data['alt_va'], data['alt_acy_va'], data['alt_datum_cd'], data['huc_cd']))
for data in ca_reservoir_data:
    cur.execute("INSERT INTO meta_data (state_code, agency_cd, site_no, station_nm, site_tp_cd, dec_lat_va, dec_long_va, coord_acy_cd, dec_coord_datum_cd, alt_va, alt_acy_va, alt_datum_cd, huc_cd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                ('ca',data['agency_cd'], data['site_no'], data['station_nm'], data['site_tp_cd'], data['dec_lat_va'], data['dec_long_va'], data['coord_acy_cd'], data['dec_coord_datum_cd'], data['alt_va'], data['alt_acy_va'], data['alt_datum_cd'], data['huc_cd']))
for data in nm_reservoir_data:
    cur.execute("INSERT INTO meta_data (state_code, agency_cd, site_no, station_nm, site_tp_cd, dec_lat_va, dec_long_va, coord_acy_cd, dec_coord_datum_cd, alt_va, alt_acy_va, alt_datum_cd, huc_cd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                ('nm',data['agency_cd'], data['site_no'], data['station_nm'], data['site_tp_cd'], data['dec_lat_va'], data['dec_long_va'], data['coord_acy_cd'], data['dec_coord_datum_cd'], data['alt_va'], data['alt_acy_va'], data['alt_datum_cd'], data['huc_cd']))
conn.commit()
cur.close()
conn.close()