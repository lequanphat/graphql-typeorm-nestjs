import {
  Button,
  Flex,
  Input,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  Tag,
} from 'antd';
import { useState } from 'react';
import { GET_ALL_USERS } from '../graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import Title from 'antd/es/typography/Title';
import { CREATE_USER_MUTATION, DELETE_USER_MUTAION } from '../graphql/mutation';
interface DataType {
  id: string;
  username: number;
  displayName: string;
  settings: {
    receiveEmails: boolean;
    receiveNotifications: boolean;
  };
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
  {
    title: 'Settings',
    dataIndex: 'settings',
    render: (settings: DataType['settings']) => (
      <Flex>
        <Tag color={settings?.receiveEmails ? 'green' : 'red'}>
          Receive Emails
        </Tag>
        <Tag color={settings?.receiveNotifications ? 'green' : 'red'}>
          Receive Notifications
        </Tag>
      </Flex>
    ),
  },
];

const sizeOfPage = 6;
const User = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
  const [deleteUserMutaion] = useMutation(DELETE_USER_MUTAION);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [users, setUsers] = useState(data?.getAllUsers || []);
  console.log(users);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleCreateUser = async () => {
    try {
      const result = await createUserMutation({
        variables: {
          createUserData: {
            username,
            displayName,
          },
        },
      });
      setUsers([...users, result.data.createUser]);
    } catch (error) {
      console.error('Mutation error:', error);
    }
    setIsModalOpen(false);
    setUsername('');
    setDisplayName('');
  };
  const handleDeleteUser = async () => {
    try {
      const result = await deleteUserMutaion({
        variables: {
          deleteUserId: selectedRowKeys[0],
        },
      });
      setSelectedRowKeys([]);

      setUsers(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        users.filter((value: any) => value.id !== result.data.deleteUser.id),
      );
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Flex justify="end" style={{ marginBottom: '10px' }}>
        <Button
          danger
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: `Do you want to delete user with id ${selectedRowKeys[0]}`,
              onOk: handleDeleteUser,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
          style={{ marginRight: '10px' }}
        >
          Delete
        </Button>
        <Button type="primary" onClick={showModal}>
          Add User +
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleCreateUser}
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
        dataSource={users.filter(handlePagination)}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        rowKey={'id'}
      />
      <Flex justify="end" style={{ paddingTop: '24px' }}>
        <Pagination
          current={currentPage}
          total={users.length}
          onChange={handleChangePage}
          defaultPageSize={sizeOfPage}
        />
      </Flex>
    </div>
  );
};
export default User;
