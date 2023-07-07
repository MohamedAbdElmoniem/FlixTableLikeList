import React, {useEffect, useState} from 'react';
import {TableLikeList} from '../components';
import {HttpClient} from '../services/HttpClient';
import {CachingService} from '../services/CachingService';

export default function Table() {
  const [datasource, setDatasource] = useState<any[]>([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    if (await CachingService.isCachingThresholdReached()) {
      CachingService.setLastDateTimeFetchingUsers();
      HttpClient.fetchUsers().then(async res => {
        setDatasource(res);
        await CachingService.setFetchedUsersData(res);
      });
    } else {
      const data = await CachingService.getFetchedUsersData();
      setDatasource([...data]);
    }
  };

  return (
    <TableLikeList datasource={datasource} onRefreshTable={fetchUsersData} />
  );
}
