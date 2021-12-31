import { useState } from "react";

const ProfileImage = ({ imageUrl }) => {
  const [profileImage, setProfileImage] = useState("");

  const onClick = (event) => {
    const {
      target: { src },
    } = event;
    imageUrl(src);
    setProfileImage(src);
  };

  return (
    <>
      <label className="profile-image-label">프로필 이미지</label>
      <div className="profile-image-box">
        <img
          src="https://i.pinimg.com/280x280_RS/71/b6/3c/71b63cf5e71f83382702900f74b911fa.jpg"
          alt="avatar"
          className={
            "profile-image-item" +
            (profileImage ===
            "https://i.pinimg.com/280x280_RS/71/b6/3c/71b63cf5e71f83382702900f74b911fa.jpg"
              ? " selected"
              : "")
          }
          onClick={onClick}
        />
        <img
          src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/6L2p/image/3mt98Ui1iL95Im7I9-psWU07Fik.jpg"
          alt="avatar"
          className={
            "profile-image-item" +
            (profileImage ===
            "https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/6L2p/image/3mt98Ui1iL95Im7I9-psWU07Fik.jpg"
              ? " selected"
              : "")
          }
          onClick={onClick}
        />
        <img
          src="https://preview.redd.it/bszppe3e95p61.jpg?width=360&format=pjpg&auto=webp&s=102aca82ac4a3b14e6961e2561645aed27247ea2"
          alt="avatar"
          className={
            "profile-image-item" +
            (profileImage ===
            "https://preview.redd.it/bszppe3e95p61.jpg?width=360&format=pjpg&auto=webp&s=102aca82ac4a3b14e6961e2561645aed27247ea2"
              ? " selected"
              : "")
          }
          onClick={onClick}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQnYIck7866o1KESyp7tqgZqYsauAnw3I8w&usqp=CAU"
          alt="avatar"
          className={
            "profile-image-item" +
            (profileImage ===
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQnYIck7866o1KESyp7tqgZqYsauAnw3I8w&usqp=CAU"
              ? " selected"
              : "")
          }
          onClick={onClick}
        />
      </div>
    </>
  );
};
export default ProfileImage;
