const User = require('../models/UserModel');
const Blog = require('../models/BlogModel');
const Comment = require('../models/CommentModel');
const WorkExperience = require('../models/WorkExpModel');
const Gallary = require('../models/GallaryModel');
const Committee = require('../models/CommitteeModel');
const Role = require('../models/RoleModel');
const Event = require('../models/EventModel');
const Announcement = require('../models/AnnouncementModel');
const Achievement = require('../models/AchievementModel'); 

// User Relations
User.hasMany(Blog, { foreignKey: {name:'reg_no', allowNull: false } })
//Blog.belongsTo(User , { foreignKey: { allowNull: false } })

Blog.hasMany(Comment,  {foreignKey: { allowNull: false } })

User.hasMany(Role, { foreignKey: { allowNull: false } })
User.hasMany(Achievement, { foreignKey: { allowNull: false } })
User.hasMany(WorkExperience, { foreignKey: { allowNull: false } })

Committee.hasMany(Role, { foreignKey: {name: 'committee_order', allowNull: false } })
Committee.hasMany(Announcement, { foreignKey: {name: 'committee_order', allowNull: false } })
Committee.hasMany(Event, { foreignKey: {name: 'committee_order', allowNull: false } })


// User.hasOne(Teacher, { foreignKey: { allowNull: false } })
// Teacher.belongsTo(User, { foreignKey: { allowNull: false } })

// User.hasOne(Student, { foreignKey: { allowNull: false } })
// Student.belongsTo(User, { foreignKey: { allowNull: false } })

// User.hasOne(Admin, { foreignKey: { allowNull: false } })
// Admin.belongsTo(User, { foreignKey: { allowNull: false } })

// // Relation between course and classroom
// Course.hasMany(Classroom, { foreignKey: { allowNull: false } })
// Classroom.belongsTo(Course, { foreignKey: { allowNull: false } })

// // Relation between student and classroom
// Teacher.hasMany(Classroom, { foreignKey: { allowNull: false } })
// Classroom.belongsTo(Teacher, { foreignKey: { allowNull: false } })

// // Relation between student and classroom
// Student.belongsToMany(Classroom, { through: 'student_classroom' })
// Classroom.belongsToMany(Student, { through: 'student_classroom' })

// // Relation between student and session
// Session.hasMany(Student, { foreignKey: { allowNull: false } })
// Student.belongsTo(Session, { foreignKey: { allowNull: false } })

// // Relation between Classroom and Class
// Classroom.hasMany(Class, { foreignKey: { allowNull: false } })
// Class.belongsTo(Classroom, { foreignKey: { allowNull: false } })

