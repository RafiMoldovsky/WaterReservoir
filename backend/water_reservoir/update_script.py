import os
import urllib.parse as up
import psycopg2
import requests
from datetime import date
from datetime import timedelta


def get_reservoir_data(state_code, start_date, end_date):
    url = f'https://waterservices.usgs.gov/nwis/dv/?format=rdb&stateCd={state_code}&startDT={start_date}&endDT={end_date}&parameterCd=00054&siteStatus=active'
    response = requests.get(url)
    data = response.text.split('\n')[28:]
    parsed_data = []
    for row in data:
        if not row.startswith('#'):
            row_data = row.split('\t')
            if not row_data[0]=='agency_cd' and not row_data[0]=='5s':
                if len(row_data) == 5:
                    parsed_data.append({
                        'agency_cd':row_data[0],
                        'site_id': row_data[1],
                        'date_time': row_data[2],
                        'storage_volume': row_data[3],
                        'value_estimated': row_data[4]
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
az_reservoir_data = get_reservoir_data('az', date.today() - timedelta(days = 1), date.today())
ca_reservoir_data = get_reservoir_data('ca', date.today() - timedelta(days = 1), date.today())
nm_reservoir_data = get_reservoir_data('nm', date.today() - timedelta(days = 1), date.today())

# insert the data into the database
cur = conn.cursor()
for data in az_reservoir_data:
    if data['date_time'] != 'datetime':
        cur.execute("INSERT INTO daily_data (state_code, agency_cd, site_id, date_time, storage_volume, value_estimated) VALUES (%s, %s, %s, %s, %s, %s)",
                    ('az',data['agency_cd'], data['site_id'], data['date_time'], data['storage_volume'],data['value_estimated']))
for data in ca_reservoir_data:
    if data['date_time'] != 'datetime':
        cur.execute("INSERT INTO daily_data (state_code, agency_cd, site_id, date_time, storage_volume, value_estimated) VALUES (%s, %s, %s, %s, %s, %s)",
                    ('ca',data['agency_cd'], data['site_id'], data['date_time'], data['storage_volume'],data['value_estimated']))
for data in nm_reservoir_data:
    if data['date_time'] != 'datetime':
        cur.execute("INSERT INTO daily_data (state_code, agency_cd, site_id, date_time, storage_volume, value_estimated) VALUES (%s, %s, %s, %s, %s, %s)",
                    ('nm',data['agency_cd'], data['site_id'], data['date_time'], data['storage_volume'],data['value_estimated']))
conn.commit()
cur.close()
conn.close()