import React, { useState, useEffect } from 'react';
import css from './style.scss';
import axios from 'axios';
import dayjs from 'dayjs';
import { usePermissionCheck } from '../../common/hooks';

import { Dashboard } from '../../layouts/Dashboard';
import { Table, Td, Tr, Th } from '../../components/Table';
import { BasicInput } from '../../components/BasicInput';


export const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const canEditPoints = usePermissionCheck('moderator');

  useEffect(() => {
    async function fetchUsers() {
      const { data: { data }} = await axios.get('/users');
      // setUsers(data);
      // setIsLoading(false);
    }
    fetchUsers();
  }, []);

  function handleUserPointsUpdate(points, userId) {
    if (points >= 1000) points = 999;
    if (points < 0) points = 0;

    setUsers(users => 
      users.map(user => user.id === userId
        ?  { ...user, points }
        : user
      )
    );
  }

  return (
    <Dashboard>
      <h1>Lista użytkowników</h1>
      <Table className={css.users_table}>
        <thead>
          <tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>Grupa</Th>
            <Th>Punkty</Th>
            <Th>Utworzony</Th>
            <Th>Zaaktualizowany</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <Tr key={user.id} className={css.users_row}>
              <Td>{user.id}</Td>
              <Td>{user.email}</Td>
              <Td className={css.user_group}>
                {user.group}
              </Td>
              <Td>
                {canEditPoints ? (
                  <BasicInput
                    type="number"
                    align="center"
                    value={user.points}
                    placeholder="Punkty"
                    onChange={(e) => handleUserPointsUpdate(
                      Number(e.target.value),
                      user.id
                    )}
                  />
                ) : user.points}
              </Td>
              <Td>{dayjs(user.createdAt).fromNow()}</Td>
              <Td>{dayjs(user.updatedAt).fromNow()}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Dashboard>
  )
}