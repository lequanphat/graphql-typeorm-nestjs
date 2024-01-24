import {
  Avatar,
  Button,
  Checkbox,
  CheckboxProps,
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
import {
  CREATE_USER_MUTATION,
  CREATE_USER_SETTING_MUTAION,
  DELETE_USER_MUTAION,
} from '../graphql/mutation';
interface DataType {
  id: string;
  email: number;
  displayName: string;
  avatar: string;
  settings: {
    receiveEmails: boolean;
    receiveNotifications: boolean;
  };

  type: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    render: (avatar: DataType['avatar']) => (
      <Flex>
        <Avatar src={avatar} alt={avatar} />
      </Flex>
    ),
  },
  {
    title: 'Username',
    dataIndex: 'email',
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
        <Tag color={settings?.receiveEmails ? 'green' : 'red'}>Emails</Tag>
        <Tag color={settings?.receiveNotifications ? 'green' : 'red'}>
          Notifications
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (type: DataType['type']) => (
      <Flex>
        <Tag color={type === 'system' ? 'default' : 'cyan'}>{type}</Tag>
      </Flex>
    ),
  },
];

const sizeOfPage = 6;
const User = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
  const [deleteUserMutation] = useMutation(DELETE_USER_MUTAION);
  const [createUserSettingMutation] = useMutation(CREATE_USER_SETTING_MUTAION);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState<boolean>(false);
  const [isSettingUserOpen, setIsSettingUserOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<React.Key[]>([]);

  const [isReceiveEmailsChecked, setIsReceiveEmailsChecked] =
    useState<boolean>(false);
  const [isReceiveNotificationsChecked, setIsReceiveNotificationsChecked] =
    useState<boolean>(false);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSelectChange = (newSelectedUser: React.Key[]) => {
    setSelectedUser(newSelectedUser);
  };

  const rowSelection = {
    selectedUser,
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

  const handleCreateUser = async () => {
    try {
      await createUserMutation({
        variables: {
          createUserData: {
            email,
            displayName,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Mutation error:', error);
    }
    setIsCreateUserOpen(false);
    setEmail('');
    setDisplayName('');
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation({
        variables: {
          deleteUserId: selectedUser[0],
        },
      });
      setSelectedUser([]);
      refetch();
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };
  const handleSettingUser = async () => {
    try {
      await createUserSettingMutation({
        variables: {
          createUserSettingsData: {
            userId: selectedUser[0],
            receiveEmails: isReceiveEmailsChecked,
            receiveNotifications: isReceiveNotificationsChecked,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Mutation error:', error);
    }
    setIsSettingUserOpen(false);
  };

  const onReceiveEmailsChange: CheckboxProps['onChange'] = (e) => {
    setIsReceiveEmailsChecked(e.target.checked);
  };
  const onReceiveNotificationsChange: CheckboxProps['onChange'] = (e) => {
    setIsReceiveNotificationsChecked(e.target.checked);
  };
  const handleOpenUserSetting = () => {
    setIsSettingUserOpen(true);
    const user = data.getAllUsers.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (user: any) => user.id === selectedUser[0],
    );
    setIsReceiveEmailsChecked(user.settings?.receiveEmails);
    setIsReceiveNotificationsChecked(user.settings?.receiveNotifications);
  };

  return (
    <div>
      <Flex justify="end" style={{ marginBottom: '10px' }}>
        <Button type="default" onClick={handleOpenUserSetting}>
          Settings
        </Button>
        <Button
          danger
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: `Do you want to delete user with id ${selectedUser[0]}`,
              onOk: handleDeleteUser,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
          style={{ margin: '0 10px' }}
        >
          Delete
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsCreateUserOpen(true);
          }}
        >
          Add User +
        </Button>
        <Modal
          title="Create User"
          open={isCreateUserOpen}
          onOk={handleCreateUser}
          onCancel={() => {
            setIsCreateUserOpen(false);
          }}
        >
          <Title level={5}>Username</Title>
          <Input
            placeholder="Email address..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
        <Modal
          title="User Settings"
          open={isSettingUserOpen}
          onOk={handleSettingUser}
          onCancel={() => {
            setIsSettingUserOpen(false);
          }}
        >
          <Title level={4}>
            {
              data.getAllUsers.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (value: any) => value.id === selectedUser[0],
              )?.displayName
            }
          </Title>
          <Flex style={{ flexDirection: 'column' }}>
            <Checkbox
              checked={isReceiveEmailsChecked}
              onChange={onReceiveEmailsChange}
            >
              Receive Emails
            </Checkbox>
            <Checkbox
              checked={isReceiveNotificationsChecked}
              onChange={onReceiveNotificationsChange}
            >
              Receive Notifications
            </Checkbox>
          </Flex>
        </Modal>
      </Flex>
      <Table
        dataSource={data.getAllUsers.filter(handlePagination)}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        rowKey={'id'}
      />
      <Flex justify="end" style={{ paddingTop: '24px' }}>
        <Pagination
          current={currentPage}
          total={data.getAllUsers.length}
          onChange={handleChangePage}
          defaultPageSize={sizeOfPage}
        />
      </Flex>
    </div>
  );
};
export default User;
