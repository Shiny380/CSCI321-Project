#!/bin/bash
export PATH=/bin:/usr/bin

# modify the following to suit your environment
export DB_BACKUP="/home/myusername/backup"
export DB_USER="cooperb"
export DB_PASSWD="Balotelli45"
export THEDATE='date +"%A, %B %-d, %Y"'

# title and version
echo ""
echo "Daily Tabbed Report: " $THEDATE
echo "----------------------"
echo "* Rotating backups…"
rm -rf $DB_BACKUP/04
mv $DB_BACKUP/03 $DB_BACKUP/04
mv $DB_BACKUP/02 $DB_BACKUP/03
mv $DB_BACKUP/01 $DB_BACKUP/02
mkdir $DB_BACKUP/01

echo "* Creating new backup..."
mysql --password=$DB_PASSWD -h 'localhost' -e "SELECT * FROM alumniapp.CONSTITUENTEXPORT WHERE datecreated >= DATE_SUB(NOW(), INTERVAL 1 DAY)" > $DB_BACKUP/01/exporteddata-`date +%Y-%m-%d`.txt
echo "* File: " $DB_BACKUP/01/exporteddata-`date +%Y-%m-%d`.txt
echo "-----