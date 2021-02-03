import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaArrowLeft, FaArrowRight, FaGem, FaHeart } from "react-icons/fa";
import { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";

const AdminSidebar = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <ProSidebar collapsed={toggle}>
      <Menu style={{ height: "100vh" }} iconShape="square" popperArrow={true}>
        <MenuItem
          icon={toggle ? <FaArrowRight /> : <FaArrowLeft />}
          onClick={() => setToggle(!toggle)}
        >
          Collapse
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          Dashboard <Link to="/admin" />
        </MenuItem>
        <MenuItem icon={<IoPersonAdd />}>
          Add Members <Link to="/admin/adduser" />
        </MenuItem>
        <SubMenu title="Components" icon={<FaHeart />}>
          <MenuItem>
            Component 1 <Link to="/admin/hi" />
          </MenuItem>
          <MenuItem>
            Component 2<Link to="/admin/hello" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default AdminSidebar;
