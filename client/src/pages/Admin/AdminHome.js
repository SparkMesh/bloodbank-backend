import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
          Introducing QuickDonorBD: Your Lifesaving Companion

In moments of urgency and compassion, QuickDonorBD emerges as your trusted companion, designed with a singular purpose – to connect blood donors with those in need, swiftly and seamlessly. Welcome to a mobile application that stands at the forefront of humanitarian aid, bridging the gap between donors and recipients in the Bangladesh region.

QuickDonorBD redefines convenience in blood donation, making it easier than ever to save lives. With a few taps on your device, you can effortlessly find donors near you, schedule donations, and create a network of lifesavers within your community. Our platform is designed to empower you with the knowledge and resources you need to act swiftly during critical situations.

Key Features:

Effortless Blood Donation: Register as a donor or recipient, and our app will match you with potential donors in your vicinity, eliminating the time-consuming search for blood.

Real-Time Updates: Stay informed with real-time notifications about blood requests and nearby donation drives, ensuring that you are always aware of urgent needs.

Secure and Confidential: Your data's privacy and security are our top priorities. All interactions are kept confidential, fostering trust among our users.

Community Building: Connect with like-minded individuals who are passionate about saving lives. Build a community of donors, recipients, and volunteers dedicated to the cause.

Donation History: Keep track of your donation history, making it easy to manage future contributions and monitor your impact.

Join us in the noble mission of saving lives, one donation at a time. QuickDonorBD is more than just an app; it's a lifeline for those in need and an opportunity for you to make a meaningful difference. Download the app today and be a part of the QuickDonorBD family, where every drop counts, and every gesture matters. Together, we can create a healthier, more compassionate Bangladesh.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
