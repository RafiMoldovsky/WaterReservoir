from crontab import CronTab

# create a new cron job
cron = CronTab(user='guslcdsr')
job = cron.new(command='python /update_script.py')

# set the schedule to run every day at midnight
job.setall('0 0 * * *')

# save the cron job
cron.write()
