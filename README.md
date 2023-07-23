# hibp_security-txt

Troy Hunt (of Have I Been Pwned fame) was [wondering out loud](https://twitter.com/troyhunt/status/1682982538409828354?s=20) (on Twitter) about how many domains that are currently listed as a breach have a `security.txt` file. So I download the json file (`breaches.json`) on 2023-07-23 and hacked a quick JS script together to check all domains.

The results are saved in `security_files`.
