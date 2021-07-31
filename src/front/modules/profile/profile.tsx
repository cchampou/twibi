import React from 'react';
import Heading from '../../components/Heading';
import useProfile from './profile.hook';
import Picture, { SizeEnum } from '../../components/Image';

const Profile = () => {
  const data = useProfile();

  if (!data) {
    return null;
  }
  console.log(data);

  return (
    <>
      <Heading level={2}>Personal information</Heading>
      <Picture
        src={data.profile_image_url}
        alt="profile_pic"
        round
        size={SizeEnum.SMALL}
      />
      <Heading level={3}>{data.display_name}</Heading>
      <p>{data.email}</p>
    </>
  );
};

export default Profile;
