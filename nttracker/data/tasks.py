import requests
import cloudscraper

from huey import crontab
from huey.contrib.djhuey import periodic_task, task


@periodic_task(crontab(minute='*/1'))
def every_five_mins():
    scraper = cloudscraper.create_scraper()
    
    
