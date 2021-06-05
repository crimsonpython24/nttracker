import requests

from huey import crontab
from huey.contrib.djhuey import periodic_task, task


@periodic_task(crontab(minute='*/1'))
def every_five_mins():
    session = requests.Session()
    url = "https://www.nitrotype.com/api/teams/pr2w"
    agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37"
    response = session.get('https://www.gamefaqs.com', headers={'User-Agent': agent})
    
    # print(response.text) 
    print(response.status_code)
