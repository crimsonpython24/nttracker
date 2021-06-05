# Generated by Django 3.2.3 on 2021-06-05 07:51

from django.db import migrations, models
import django.db.models.deletion
import django_unixdatetimefield.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Racer',
            fields=[
                ('racer_id', models.IntegerField(primary_key=True, serialize=False)),
                ('races', models.IntegerField()),
                ('time', models.IntegerField()),
                ('typed', models.IntegerField()),
                ('errs', models.IntegerField()),
                ('joinStamp', django_unixdatetimefield.fields.UnixDateTimeField()),
                ('lastActivity', models.IntegerField()),
                ('role', models.CharField(max_length=10)),
                ('username', models.CharField(max_length=200)),
                ('display_name', models.CharField(max_length=100)),
                ('total_races', models.IntegerField()),
                ('speed', models.IntegerField()),
                ('last_login', django_unixdatetimefield.fields.UnixDateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='RaceData',
            fields=[
                ('team_id', models.IntegerField(primary_key=True, serialize=False)),
                ('tag', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=100)),
                ('members', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data.racer')),
            ],
        ),
    ]