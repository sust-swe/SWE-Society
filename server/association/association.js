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
const Credential = require('../models/CredentialModel');

// User Relations
User.hasMany(Blog, { foreignKey: { name: 'reg_no', allowNull: false } })
//Blog.belongsTo(User , { foreignKey: { allowNull: false } })
User.hasMany(Comment, { foreignKey: { name: 'reg_no', allowNull: false } })
User.hasOne(Credential, { foreignKey: { name: 'reg_no', allowNull: false } })

Blog.hasMany(Comment, { foreignKey: { allowNull: false } })

User.hasMany(Role, { foreignKey: { allowNull: false } })
User.hasMany(Achievement, { foreignKey: { allowNull: false } })
User.hasMany(WorkExperience, { foreignKey: { allowNull: false } })

Committee.hasMany(Role, { foreignKey: { name: 'committee_order', allowNull: false } })
Committee.hasMany(Announcement, { foreignKey: { name: 'committee_order', allowNull: false } })
Committee.hasMany(Event, { foreignKey: { name: 'committee_order', allowNull: false } })


