SELECT work_stations.*, sum(output) as tot_output, avg(output) as avg_output 
FROM `work_stations` 
INNER JOIN `hourly_outputs` ON `hourly_outputs`.`work_station_id` = `work_stations`.`id` 
WHERE `work_stations`.`operation_bulletin_id` = 4 AND (DATE(logged_at) = '2016-04-05') 
GROUP BY work_stations.id;