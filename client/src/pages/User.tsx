import {
  Button,
  Flex,
  Input,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
} from 'antd';
import { useState } from 'react';
import { GET_ALL_USERS } from '../graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import Title from 'antd/es/typography/Title';
import { CREATE_USER_MUTATION } from '../graphql/mutation';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const columns: TableColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'DisplayName',
    dataIndex: 'displayName',
  },
];

const sizeOfPage = 6;
const User = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const handlePagination = (value: any, index: number) => {
    if (
      index >= (currentPage - 1) * sizeOfPage &&
      index < currentPage * sizeOfPage
    ) {
      return value;
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const result = await createUserMutation({
        variables: {
          createUserData: {
            username,
            displayName,
          },
        },
      });
      console.log('Mutation result:', result);
    } catch (error) {
      console.error('Mutation error:', error);
    }
    setIsModalOpen(false);
    setUsername('');
    setDisplayName('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Flex justify="end" style={{ marginBottom: '10px' }}>
        <Button type="primary" onClick={showModal}>
          Add User +
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Title level={5}>Username</Title>
          <Input
            placeholder="Enter username..."
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Title level={5}>Displayname</Title>
          <Input
            placeholder="Enter display name..."
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </Modal>
      </Flex>
      <Table
        dataSource={data.getAllUsers.filter(handlePagination)}
        columns={columns}
        pagination={false}
      />
      <Flex justify="end" style={{ paddingTop: '24px' }}>
        <Pagination
          current={currentPage}
          total={data.getAllUsers.length}
          onChange={handleChangePage}
          defaultPageSize={4}
        />
      </Flex>
    </div>
  );
};
export default User;
