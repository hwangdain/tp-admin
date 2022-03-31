# Generated by Django 4.0.1 on 2022-03-31 06:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0002_actualbudget_estimatedbudget_project_delete_board_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actualbudget',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='actual_bugdet', to='board.project'),
        ),
        migrations.AlterField(
            model_name='estimatedbudget',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estimated_bugdet', to='board.project'),
        ),
    ]
