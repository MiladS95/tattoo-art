import { Avatar, Button, Grid, Box, Typography, Snackbar } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AddCreditCard } from '../../../components/AddCreditCard/AddCreditCard';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyles';
import React, { useEffect, useState } from 'react';
import { getCustomerInfo } from '../../../helpers/APICalls/customer';
import { Customer, User } from '../../../interface/User';
import { useAuth } from '../../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

interface data {
  message: string;
  user: User;
  token: string;
}

const stripeTest = loadStripe(process.env.REACT_APP_KEY || '');
export default function EditProfile(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [customer, setCustomer] = useState<Customer>();
  const [profileImage, setProfileImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { loggedInUser, updateUser } = useAuth();
  useEffect(() => {
    async function fetchCustomerInfo() {
      const response = await getCustomerInfo();

      if (response) {
        const tempCustomer = response.customer;
        setCustomer(tempCustomer);
      }
      if (loggedInUser?.profileImage) {
        setProfileImage(loggedInUser.profileImage);
      }
    }

    fetchCustomerInfo();
  }, [value, loggedInUser]);

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        className={classes.mainContainer}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  const handleClose = () => {
    setOpen(false);
  };
  const selectFiles = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
    e.preventDefault();

    const image = e.target.files;
    const data = new FormData();
    if (image) {
      data.append(
        //this is gonna be the name of the response object. needs to match what's in the function(routes/api/profile.js line 38)
        'multiImage',
        image[0],
        image[0].name,
      );
    }
    setIsLoading(true);

    const response = await axios.post('/users/profile/update', data);
    if (response.data) {
      const { user } = response.data.success;
      const data: data = {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
        },
        message: 'Update Logged in user',
        token: 'token',
      };
      updateUser(data);
      setProfileImage(user.profileImage);
      setIsLoading(false);
      setOpen(true);
      setMessage('Profile Picture Changed');
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  if (loggedInUser) {
    return (
      <Grid container>
        <Box className={classes.tabContainer} boxShadow={4}>
          <Grid className={classes.tabDisplay}>
            <Tabs orientation="vertical" value={value} onChange={handleChange} className={classes.tabs}>
              <Tab label="Profile" />
              <Tab label="Personal Information" />
              <Tab label="Payment details" />
              <Tab label="Notifications" />
              <Tab label="Password" />
            </Tabs>
          </Grid>
        </Box>
        <TabPanel value={value} index={2}>
          <Elements stripe={stripeTest}>
            <AddCreditCard customer={customer} />
          </Elements>
        </TabPanel>
        <TabPanel value={value} index={0}>
          <Grid container className={classes.profileImageContainer}>
            <Typography variant={'h5'}>Profile Image</Typography>

            {!profileImage ? (
              <Avatar
                className={classes.profileImage}
                alt="Profile Image"
                src={`https://robohash.org/${loggedInUser.email}.png`}
              />
            ) : (
              <Avatar className={classes.profileImage} alt="Profile Image" src={profileImage} />
            )}
            <Typography variant={'h5'}>{loggedInUser.username}</Typography>
            <input type="file" id="fileUploadButton" style={{ display: 'none' }} onChange={(e) => selectFiles(e)} />
            <label htmlFor={'fileUploadButton'}>
              <Button color="secondary" className={classes.submit} variant="contained" component="span">
                {isLoading ? <CircularProgress /> : 'Upload'}
              </Button>
            </label>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={message}
          />
        </TabPanel>
      </Grid>
    );
  } else return <CircularProgress />;
}
