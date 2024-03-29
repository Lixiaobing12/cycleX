/*
 Navicat Premium Data Transfer

 Source Server         : alocalhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : whale_app

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 16/03/2024 01:08:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity_log
-- ----------------------------
DROP TABLE IF EXISTS `activity_log`;
CREATE TABLE `activity_log`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `log_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `subject_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `causer_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `causer_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `properties` json NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `subject`(`subject_type`, `subject_id`) USING BTREE,
  INDEX `causer`(`causer_type`, `causer_id`) USING BTREE,
  INDEX `activity_log_log_name_index`(`log_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 568995 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_extension_histories
-- ----------------------------
DROP TABLE IF EXISTS `admin_extension_histories`;
CREATE TABLE `admin_extension_histories`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 1,
  `version` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `admin_extension_histories_name_index`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_extensions
-- ----------------------------
DROP TABLE IF EXISTS `admin_extensions`;
CREATE TABLE `admin_extensions`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `is_enabled` tinyint(4) NOT NULL DEFAULT 0,
  `options` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_extensions_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_log
-- ----------------------------
DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE `admin_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `route` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parameters` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `request_body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `ip` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu`;
CREATE TABLE `admin_menu`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `uri` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `extension` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `show` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 950 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_permission_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_permission_menu`;
CREATE TABLE `admin_permission_menu`  (
  `permission_id` bigint(20) NOT NULL,
  `menu_id` bigint(20) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  UNIQUE INDEX `admin_permission_menu_permission_id_menu_id_unique`(`permission_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_permissions
-- ----------------------------
DROP TABLE IF EXISTS `admin_permissions`;
CREATE TABLE `admin_permissions`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `http_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `http_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `parent_id` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_permissions_slug_unique`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_menu`;
CREATE TABLE `admin_role_menu`  (
  `role_id` bigint(20) NOT NULL,
  `menu_id` bigint(20) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  UNIQUE INDEX `admin_role_menu_role_id_menu_id_unique`(`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_permissions`;
CREATE TABLE `admin_role_permissions`  (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  UNIQUE INDEX `admin_role_permissions_role_id_permission_id_unique`(`role_id`, `permission_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_role_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_users`;
CREATE TABLE `admin_role_users`  (
  `role_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  UNIQUE INDEX `admin_role_users_role_id_user_id_unique`(`role_id`, `user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_roles
-- ----------------------------
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_roles_slug_unique`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_settings
-- ----------------------------
DROP TABLE IF EXISTS `admin_settings`;
CREATE TABLE `admin_settings`  (
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`slug`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_users_username_unique`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for advertises
-- ----------------------------
DROP TABLE IF EXISTS `advertises`;
CREATE TABLE `advertises`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(10) NULL DEFAULT NULL COMMENT '排序',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '后台区分的标题',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '前台显示的标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '如果有content，则img_url无效',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `position` enum('HOME','CURRENT','PERIODICAL','FUND') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'HOME',
  `start_at` timestamp(0) NULL DEFAULT NULL COMMENT '生效时间',
  `status` tinyint(4) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'banner' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for announce_user
-- ----------------------------
DROP TABLE IF EXISTS `announce_user`;
CREATE TABLE `announce_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `announce_list` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0'  COMMENT '已读的id列表',
  `read_max_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公告-已读或未读(可优化)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for announces
-- ----------------------------
DROP TABLE IF EXISTS `announces`;
CREATE TABLE `announces`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(10) NULL DEFAULT NULL COMMENT '排序',
  `read_num` int(11) NULL DEFAULT 0  COMMENT '已读数量',
  `uuid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '由顶部下来的通知',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `desc` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `admin_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '后台创建人',
  `status` tinyint(4) NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '公告管理' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for aopinions
-- ----------------------------
DROP TABLE IF EXISTS `aopinions`;
CREATE TABLE `aopinions`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱用于回消息',
  `img_urls` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片地址list',
  `admin_notes` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '回复内容',
  `admin_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '回复管理员名称',
  `status` tinyint(2) NULL DEFAULT 0 COMMENT '0未处理1已处理2忽略',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '反馈和建议' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for apopup
-- ----------------------------
DROP TABLE IF EXISTS `apopup`;
CREATE TABLE `apopup`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(11) NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '弹窗图',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '地址',
  `jump_type` enum('EXTERNAL','WITHIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'EXTERNAL' COMMENT '类型外部，内部',
  `status` tinyint(2) NULL DEFAULT 0 COMMENT '状态',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '弹窗' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for aproblem
-- ----------------------------
DROP TABLE IF EXISTS `aproblem`;
CREATE TABLE `aproblem`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NULL DEFAULT 0,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'HELP',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` tinyint(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '问题' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(10) NULL DEFAULT NULL COMMENT '排序',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `thumb_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `type` enum('NEWS','REPORT','HELP','PRODUCT','VIDEO','FLASH','ARTICLE','SCHOOL','WEB_HOT','WEB_DYNAMIC') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT 0,
  `video_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `video_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '视频地址',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '媒体管理' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for asset_states
-- ----------------------------
DROP TABLE IF EXISTS `asset_states`;
CREATE TABLE `asset_states`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) NULL DEFAULT NULL  COMMENT '代币id',
  `price` double NULL DEFAULT NULL COMMENT '价格',
  `volume_24h` double NULL DEFAULT NULL,
  `percent_change_1h` float NULL DEFAULT NULL,
  `percent_change_24h` float NULL DEFAULT NULL,
  `percent_change_7d` float NULL DEFAULT NULL,
  `market_cap` double NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for assets
-- ----------------------------
DROP TABLE IF EXISTS `assets`;
CREATE TABLE `assets`  (
  `id` int(11) UNSIGNED NOT NULL,
  `ecosystem_id` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '中文名',
  `name_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '英文名',
  `name_iso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '三位名',
  `unique_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列如智能合约',
  `dsn_token_id` int(11) NULL DEFAULT NULL,
  `rate` decimal(16, 8) NULL DEFAULT NULL COMMENT '人民币的价格',
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '前辍符号',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '后辍单位',
  `decimal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '显示的小数位',
  `inner_pay` tinyint(4) NULL DEFAULT 0,
  `pre_create` tinyint(4) NULL DEFAULT 1 COMMENT '预创建',
  `withdraw_enable` tinyint(4) NULL DEFAULT 1 COMMENT '开启提现?',
  `withdraw_min` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '提现最小额',
  `withdraw_max` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '提现最大额',
  `withdraw_fee_rate` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '提现手续费率',
  `withdraw_fee_min` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '提现最小手续费',
  `withdraw_fee_max` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '提现最大手续费',
  `withdraw_audit` decimal(18, 8) NULL DEFAULT 100.00000000 COMMENT '提现到达审核额',
  `deposit_enable` tinyint(4) NULL DEFAULT 1 COMMENT '开启充值?',
  `deposit_min` decimal(16, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '最小充值',
  `deposit_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '充值到账网络',
  `transfer_enable` tinyint(4) NULL DEFAULT 0 COMMENT '开启转账?',
  `transfer_min` decimal(18, 8) NULL DEFAULT NULL COMMENT '转账最小金额',
  `transfer_max` decimal(18, 8) NULL DEFAULT NULL COMMENT '转账最大金额',
  `transfer_fee_rate` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '转账手续费',
  `transfer_audit` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '审核',
  `coinmarketcap_id` int(11) NULL DEFAULT NULL,
  `status` enum('NORMAL','ABNORMAL') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'NORMAL',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bond_states
-- ----------------------------
DROP TABLE IF EXISTS `bond_states`;
CREATE TABLE `bond_states`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `bond_id` int(11) NOT NULL COMMENT '债券id',
  `solar_date` timestamp(0) NOT NULL COMMENT '时间',
  `yield_2y` decimal(10, 4) NULL DEFAULT 0.0000 COMMENT '2年内幅度',
  `yield_5y` decimal(10, 4) NULL DEFAULT 0.0000,
  `yield_10y` decimal(10, 4) NULL DEFAULT 0.0000,
  `yield_30y` decimal(10, 4) NULL DEFAULT 0.0000,
  `yield_10y_2y` decimal(10, 4) NULL DEFAULT 0.0000,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `bonds_date`(`bond_id`, `solar_date`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17399 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '债卷数据' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bonds
-- ----------------------------
DROP TABLE IF EXISTS `bonds`;
CREATE TABLE `bonds`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '债券名称',
  `name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '债券英文',
  `number` int(11) NULL DEFAULT 10 COMMENT '单次获取数量',
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '单位',
  `status` enum('NORMAL','ABNORMAL') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'NORMAL',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '债卷' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '优惠券',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `asset_id` int(11) NULL DEFAULT NULL COMMENT '资产id',
  `type` enum('MINER','COMPUTING') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'COMPUTING' COMMENT '整机还是云算力',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '优惠券' COMMENT '名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `amount` int(11) NULL DEFAULT 0 COMMENT '金额',
  `unit` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'U' COMMENT '后缀',
  `limit_amount` int(11) NULL DEFAULT 0 COMMENT '额度',
  `status` enum('NOTUSED','USED','OVERDUE','CANCEL') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '状态',
  `number` int(11) NULL DEFAULT 1 COMMENT '编号',
  `corresponding` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '对应的订单',
  `expiration_at` timestamp(0) NULL DEFAULT NULL COMMENT '过期时间',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for current
-- ----------------------------
DROP TABLE IF EXISTS `current`;
CREATE TABLE `current`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `number` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '份数',
  `amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '购买金额',
  `total_amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '总购买金额',
  `total_output` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '总收益',
  `last_output_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '最近产出时间',
  `status` enum('CREATED','ENABLED','DECLINING','PAUSED','FINISHED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_product_unique`(`user_id`, `asset_id`, `product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活期 总值' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for current_kpi
-- ----------------------------
DROP TABLE IF EXISTS `current_kpi`;
CREATE TABLE `current_kpi`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `income` decimal(10, 2) NOT NULL,
  `date_time` timestamp(0) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活期业绩' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for current_orders
-- ----------------------------
DROP TABLE IF EXISTS `current_orders`;
CREATE TABLE `current_orders`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `asset_id` int(2) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL,
  `price` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '当前产品价格',
  `number` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '份数',
  `amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '金额',
  `pay_fee` decimal(8, 4) NULL DEFAULT 0.0000 COMMENT '手续费',
  `status` enum('CREATED','ENABLED','CANCELED','CREATE_REDEEM','REDEEM') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'CREATED',
  `success_at` timestamp(0) NULL DEFAULT NULL COMMENT '预计成功时间',
  `successed_at` timestamp(0) NULL DEFAULT NULL COMMENT '实际成功时间',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活期订单' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for current_outputs
-- ----------------------------
DROP TABLE IF EXISTS `current_outputs`;
CREATE TABLE `current_outputs`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `asset_id` int(2) NOT NULL DEFAULT 0,
  `current_id` int(11) NOT NULL COMMENT '活期产品id',
  `product_id` int(11) NOT NULL DEFAULT 0,
  `output` decimal(18, 6) NOT NULL DEFAULT 0.000000 COMMENT '利息',
  `status` enum('RELEASING','PAUSED','FINSHED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'RELEASING',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活期产出' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for current_pd
-- ----------------------------
DROP TABLE IF EXISTS `current_pd`;
CREATE TABLE `current_pd`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `proportion` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '占比',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金持仓分布' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for current_products
-- ----------------------------
DROP TABLE IF EXISTS `current_products`;
CREATE TABLE `current_products`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `simple_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '产品简称',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '产品名称',
  `labels` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签列表',
  `voucher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '凭证',
  `contract_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '合约地址',
  `pledge` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '质押',
  `circulate` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '流通数量',
  `min_pay` int(11) NULL DEFAULT 10 COMMENT '最小购买',
  `quota_num` int(11) NULL DEFAULT 1000 COMMENT '限购数量',
  `income` decimal(10, 4) NULL DEFAULT 1.0000 COMMENT '预计年化',
  `income2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细页显示信息',
  `income_refer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '参考参数',
  `history_income` decimal(10, 4) NULL DEFAULT 1.0000 COMMENT '历史收益',
  `history_income2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细页显示信息',
  `pay_fee` decimal(6, 2) NULL DEFAULT 0.00 COMMENT '申购手续费',
  `pay_t_n` int(6) NULL DEFAULT 1 COMMENT 't+n',
  `sell_fee` decimal(6, 2) NULL DEFAULT 0.00 COMMENT '赎回手续费',
  `sell_t_n` int(6) NULL DEFAULT 1,
  `kpi_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'kpi' COMMENT 'kpi类型',
  `kpi_number` int(4) NULL DEFAULT 10,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '主图',
  `share_posters` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分享海报',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '产品介绍',
  `market_value` decimal(18, 4) NULL DEFAULT 1.0000 COMMENT '当前市值',
  `raised_number` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '募集份数',
  `raised_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '募集金额',
  `redeem_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '赎回金额',
  `interest_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '派息金额',
  `status` enum('CREATED','ENABLED','PAUSED','OUTSTOCK','NOPASS') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED' COMMENT '状态',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活期产品' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ecosystem_blocks
-- ----------------------------
DROP TABLE IF EXISTS `ecosystem_blocks`;
CREATE TABLE `ecosystem_blocks`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ecosystem_id` int(11) NULL DEFAULT NULL,
  `block_number` int(11) NULL DEFAULT NULL,
  `block_sub` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'filecoin有区块ID的概念，即多个块',
  `handled_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `block_sub`(`block_sub`) USING BTREE,
  INDEX `handled_at`(`handled_at`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ecosystem_states
-- ----------------------------
DROP TABLE IF EXISTS `ecosystem_states`;
CREATE TABLE `ecosystem_states`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ecosystem_id` int(11) NULL DEFAULT NULL,
  `chain_high` int(11) NULL DEFAULT NULL COMMENT '区块高度',
  `chain_storage` float NULL DEFAULT NULL COMMENT '全网有效算力 EB',
  `chain_pledge` bigint(20) NULL DEFAULT NULL COMMENT 'FIL质押量',
  `chain_circulation` bigint(20) NULL DEFAULT NULL COMMENT 'FIL流通量',
  `chain_burnt` bigint(20) NULL DEFAULT NULL COMMENT 'FIL销毁量',
  `chain_accounts` int(11) NULL DEFAULT NULL COMMENT '总账户数',
  `chain_block_time` float NULL DEFAULT NULL COMMENT '平均区块间隔',
  `block_per_high` float NULL DEFAULT NULL COMMENT '平均每高度区块数量',
  `award_block` float NULL DEFAULT NULL COMMENT '每区块奖励',
  `award_per_unit_24h` float NULL DEFAULT NULL COMMENT '24h平均挖矿收益',
  `award_total_24h` float NULL DEFAULT NULL COMMENT '近24h产出量',
  `pledge_per_unit` float NULL DEFAULT NULL COMMENT '每单位质押币数',
  `gas_per_unit` float NULL DEFAULT NULL COMMENT '每单位算力的gas费',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ecosystems
-- ----------------------------
DROP TABLE IF EXISTS `ecosystems`;
CREATE TABLE `ecosystems`  (
  `id` int(11) UNSIGNED NOT NULL,
  `eco_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `chain_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '链名称',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dsn_server` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dsn_appkey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dsn_appsecret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT 1,
  `mining_lock_rate` float NULL DEFAULT 0,
  `mining_lock_days` int(11) NULL DEFAULT NULL,
  `connect_status` tinyint(4) NULL DEFAULT 1,
  `deposit_tip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deposit_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '统一充值阶段用的',
  `last_block_number` int(11) NULL DEFAULT 0,
  `done_block_number` int(11) NULL DEFAULT 0,
  `last_block_size` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund
-- ----------------------------
DROP TABLE IF EXISTS `fund`;
CREATE TABLE `fund`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `asset_id` int(11) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `number` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '份数',
  `amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '购买金额',
  `total_amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '总购买金额',
  `last_output` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '最近产出',
  `total_output` decimal(18, 8) NULL DEFAULT 0.00000000,
  `last_output_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '最近产出时间',
  `status` enum('CREATED','ENABLED','DECLINING','PAUSED','FINISHED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_product_unique`(`user_id`, `asset_id`, `product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_annex
-- ----------------------------
DROP TABLE IF EXISTS `fund_annex`;
CREATE TABLE `fund_annex`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `annex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '附件',
  `released_at` timestamp(0) NULL DEFAULT NULL COMMENT '发布时间',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金报告' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_kpi
-- ----------------------------
DROP TABLE IF EXISTS `fund_kpi`;
CREATE TABLE `fund_kpi`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `income` decimal(10, 4) NOT NULL,
  `date_time` timestamp(0) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金业绩' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_orders
-- ----------------------------
DROP TABLE IF EXISTS `fund_orders`;
CREATE TABLE `fund_orders`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT 0,
  `asset_id` int(2) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `price` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '当前产品价格',
  `number` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '份数',
  `amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '金额',
  `pay_fee` decimal(8, 4) NULL DEFAULT 0.0000 COMMENT '手续费',
  `status` enum('CREATED','ENABLED','CANCELED','CREATE_REDEEM','REDEEM') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED',
  `success_at` timestamp(0) NULL DEFAULT NULL COMMENT '预计购买成功时间',
  `successed_at` timestamp(0) NULL DEFAULT NULL COMMENT '实际购买成功时间',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金订单' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_outputs
-- ----------------------------
DROP TABLE IF EXISTS `fund_outputs`;
CREATE TABLE `fund_outputs`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `asset_id` int(2) NOT NULL DEFAULT 0,
  `fund_id` int(11) NOT NULL COMMENT '活期产品id',
  `product_id` int(11) NOT NULL DEFAULT 0,
  `output` decimal(18, 6) NOT NULL DEFAULT 0.000000 COMMENT '利息',
  `status` enum('RELEASING','PAUSED','FINSHED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'RELEASING',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金-产出' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_pd
-- ----------------------------
DROP TABLE IF EXISTS `fund_pd`;
CREATE TABLE `fund_pd`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `proportion` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '占比',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金持仓分布' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_predicts
-- ----------------------------
DROP TABLE IF EXISTS `fund_predicts`;
CREATE TABLE `fund_predicts`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NULL DEFAULT NULL,
  `predict_time` timestamp(0) NULL DEFAULT NULL COMMENT '时间',
  `net_worth` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '净值',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '基金估值' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fund_products
-- ----------------------------
DROP TABLE IF EXISTS `fund_products`;
CREATE TABLE `fund_products`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `simple_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '产品简称',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '产品名称',
  `labels` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签列表',
  `voucher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '凭证',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '单位',
  `lock` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '锁仓',
  `subsist` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '存续',
  `rate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '费率',
  `contract_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '合约地址',
  `pledge` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '质押',
  `net_worth` decimal(18, 4) NULL DEFAULT 1.0000 COMMENT '单位净资产',
  `circulate` decimal(18, 4) NULL DEFAULT 1.0000 COMMENT '流通数量',
  `min_pay` int(11) NULL DEFAULT 10 COMMENT '最小购买',
  `quota_num` int(11) NULL DEFAULT 1000 COMMENT '限购数量',
  `income` decimal(10, 4) NULL DEFAULT 1.0000 COMMENT '预计年化',
  `income2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细页显示信息',
  `income_refer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '参考参数',
  `history_income` decimal(10, 4) NULL DEFAULT 1.0000 COMMENT '历史收益',
  `history_income2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细页显示信息',
  `pay_fee` decimal(6, 2) NULL DEFAULT 0.00 COMMENT '申购手续费',
  `pay_t_n` int(6) NULL DEFAULT 1 COMMENT 't+n',
  `sell_fee` decimal(6, 2) NULL DEFAULT 0.00 COMMENT '赎回手续费',
  `sell_t_n` int(6) NULL DEFAULT 1 COMMENT 't+n',
  `sale_day` int(6) NULL DEFAULT 1 COMMENT '销售期天数',
  `sale_start_at` timestamp(0) NULL DEFAULT NULL COMMENT '销售期开始',
  `sale_end_at` timestamp(0) NULL DEFAULT NULL COMMENT '销售期结束',
  `lock_day` int(6) NULL DEFAULT 1 COMMENT '锁仓期天数',
  `lock_start_at` timestamp(0) NULL DEFAULT NULL COMMENT '锁仓期开始',
  `lock_end_at` timestamp(0) NULL DEFAULT NULL COMMENT '锁仓期结束',
  `open_day` int(6) NULL DEFAULT 1 COMMENT '开发期天数',
  `open_start_at` timestamp(0) NULL DEFAULT NULL COMMENT '开放期开始',
  `open_end_at` timestamp(0) NULL DEFAULT NULL COMMENT '开放期结束',
  `kpi_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'kpi',
  `kpi_number` int(4) NULL DEFAULT 10,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '主图',
  `share_posters` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分享海报',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '产品介绍',
  `market_value` decimal(18, 4) NULL DEFAULT 1.0000 COMMENT '当前市值',
  `raised_number` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '卖出份数',
  `raised_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '募集金额',
  `redeem_number` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '赎回份数',
  `redeem_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '赎回金额',
  `interest_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '派息金额',
  `status` enum('CREATED','ENABLED','PAUSED','OUTSTOCK','NOPASS') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED' COMMENT '状态',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活期产品' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for home_hot
-- ----------------------------
DROP TABLE IF EXISTS `home_hot`;
CREATE TABLE `home_hot`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `kpi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('hot','good') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'hot',
  `product_type` enum('current','regular','fund') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'current',
  `product_id` int(11) NOT NULL DEFAULT 0,
  `datetime` timestamp(0) NULL DEFAULT NULL,
  `net_worth` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '单价',
  `income_increase` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '涨幅',
  `status` int(2) NOT NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '首页-热门选择' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for home_platform
-- ----------------------------
DROP TABLE IF EXISTS `home_platform`;
CREATE TABLE `home_platform`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` enum('position','income') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'position',
  `total` decimal(18, 2) NULL DEFAULT 0.00 COMMENT '总量($)',
  `unit` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '单位',
  `datetime` timestamp(0) NOT NULL COMMENT '时间',
  `scale` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '规模($)',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '首页-平台持仓/收益' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for home_portfolio
-- ----------------------------
DROP TABLE IF EXISTS `home_portfolio`;
CREATE TABLE `home_portfolio`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '数字',
  `kpi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kpi_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'kpi',
  `kpi_number` int(4) NULL DEFAULT 10,
  `status` int(2) NULL DEFAULT 1,
  `sort` int(11) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '首页资产组合' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for home_server
-- ----------------------------
DROP TABLE IF EXISTS `home_server`;
CREATE TABLE `home_server`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(11) NULL DEFAULT 1,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jump_type` enum('EXTERNAL','WITHIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'EXTERNAL',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '平台服务' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for llconfig
-- ----------------------------
DROP TABLE IF EXISTS `llconfig`;
CREATE TABLE `llconfig`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '变量名',
  `type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '键值',
  `option` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '选项:select,radio等选择类型的数据',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '说明',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `llconfig_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '配置文件config' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for market
-- ----------------------------
DROP TABLE IF EXISTS `market`;
CREATE TABLE `market`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` enum('position','encryption','tokens') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'position',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '产品',
  `scale` decimal(18, 8) NULL DEFAULT NULL COMMENT '规模',
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '单位',
  `net_worth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '净值',
  `kpi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `income` decimal(10, 2) NULL DEFAULT NULL COMMENT '收益(%)',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '市场-持仓' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for market_price
-- ----------------------------
DROP TABLE IF EXISTS `market_price`;
CREATE TABLE `market_price`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(11) NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `selected` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1',
  `income` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '市场-基金行情' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for msg_emails
-- ----------------------------
DROP TABLE IF EXISTS `msg_emails`;
CREATE TABLE `msg_emails`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `params` json NULL,
  `status` enum('CREATED','SENT') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'CREATED',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for msg_messages
-- ----------------------------
DROP TABLE IF EXISTS `msg_messages`;
CREATE TABLE `msg_messages`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `module_code` enum('AUTH','OTHER','UPGRADE','NEWUPGRADE','NOTICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'OTHER',
  `title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `level` enum('success','primary','warning','danger') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `read_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for msg_notifications
-- ----------------------------
DROP TABLE IF EXISTS `msg_notifications`;
CREATE TABLE `msg_notifications`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` bigint(20) NULL DEFAULT NULL COMMENT '由顶部下来的通知',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `type` enum('ERROR','WARN','INFO','SUCCESS') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'INFO',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for msg_provide
-- ----------------------------
DROP TABLE IF EXISTS `msg_provide`;
CREATE TABLE `msg_provide`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `app_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `app_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `app_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `template_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `template_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `secret_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `secret_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `template_name_unique`(`template_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for msg_provide_country
-- ----------------------------
DROP TABLE IF EXISTS `msg_provide_country`;
CREATE TABLE `msg_provide_country`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(11) NULL DEFAULT 1,
  `name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '国家(或地区)',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '中文名',
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '代号',
  `prefix` int(20) NULL DEFAULT NULL COMMENT '国家码',
  `price` decimal(10, 6) NULL DEFAULT 0.000000 COMMENT '美元',
  `status` int(2) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 438 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for msg_smses
-- ----------------------------
DROP TABLE IF EXISTS `msg_smses`;
CREATE TABLE `msg_smses`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `mobile` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `code` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `params` json NULL,
  `type` enum('OTHERS','REGISTER','SECURITY','RECOVER','WITHDRAWAL') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'OTHERS',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '1为可用，0为非可用',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for oauth_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE `oauth_access_tokens`  (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `expires_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `oauth_access_tokens_user_id_index`(`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for oauth_auth_codes
-- ----------------------------
DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE `oauth_auth_codes`  (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `oauth_auth_codes_user_id_index`(`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for oauth_clients
-- ----------------------------
DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE `oauth_clients`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `oauth_clients_user_id_index`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for oauth_personal_access_clients
-- ----------------------------
DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE `oauth_personal_access_clients`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for oauth_refresh_tokens
-- ----------------------------
DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE `oauth_refresh_tokens`  (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `oauth_refresh_tokens_access_token_id_index`(`access_token_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for opendb_app_list
-- ----------------------------
DROP TABLE IF EXISTS `opendb_app_list`;
CREATE TABLE `opendb_app_list`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `appid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用的AppID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用名称',
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用描述',
  `creator_uid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建者的user_id，创建者必然是用户，不随应用转让而改变',
  `owner_type` int(1) NULL DEFAULT NULL COMMENT '应用当前归属者类型，1：个人，2：企业',
  `owner_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用当前归属者的id，user_id or enterprise_id',
  `managers` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用管理员ID列表',
  `members` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '团队成员ID列表',
  `icon_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用图标链接',
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用简介',
  `screenshot` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用截图',
  `app_android` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '安卓 App 相关信息',
  `app_ios` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '苹果 App 相关信息',
  `h5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'H5 可访问链接',
  `quickapp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '快应用名称',
  `store_list` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发布的应用市场',
  `create_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_app_id`(`appid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '更新app列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for opendb_app_versions
-- ----------------------------
DROP TABLE IF EXISTS `opendb_app_versions`;
CREATE TABLE `opendb_app_versions`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `appid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用的AppID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用名称',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新标题',
  `contents` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新内容',
  `platform` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新平台，Android || iOS || [Android, iOS]',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '安装包类型，native_app || wgt',
  `uni_platform` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'uni平台信息，如：mp-weixin/web/app',
  `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '当前包版本号，必须大于当前线上发行版本号',
  `min_uni_version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '原生App最低版本',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '可下载安装包地址',
  `stable_publish` int(1) NULL DEFAULT NULL COMMENT '是否上线发行',
  `is_silently` int(1) NULL DEFAULT NULL COMMENT '是否静默更新',
  `is_mandatory` int(1) NULL DEFAULT NULL COMMENT '是否强制更新',
  `create_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '上传时间',
  `create_env` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建来源，uni-stat：uni统计自动创建，upgrade-center：升级中心管理员创建',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '更新版本' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for regular
-- ----------------------------
DROP TABLE IF EXISTS `regular`;
CREATE TABLE `regular`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `asset_id` int(11) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `number` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '份数',
  `amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '购买金额',
  `total_amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '总购买金额',
  `total_output` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '总产出',
  `status` enum('CREATED','ENABLED','DECLINING','PAUSED','FINISHED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_product_unique`(`user_id`, `asset_id`, `product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定期 总值' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for regular_orders
-- ----------------------------
DROP TABLE IF EXISTS `regular_orders`;
CREATE TABLE `regular_orders`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT 0,
  `asset_id` int(2) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `contract_days` int(6) NULL DEFAULT 30 COMMENT '定存天数',
  `number` decimal(18, 4) NULL DEFAULT 0.0000,
  `amount` decimal(18, 4) NULL DEFAULT 0.0000 COMMENT '金额',
  `pay_fee` decimal(8, 4) NULL DEFAULT 0.0000,
  `output` decimal(18, 4) NULL DEFAULT 0.0000,
  `status` enum('CREATED','ENABLED','CANCELED','CREATE_REDEEM','REDEEM') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED',
  `last_output_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '最近产出时间',
  `success_at` timestamp(0) NULL DEFAULT NULL COMMENT '预计购买成功时间',
  `successed_at` timestamp(0) NULL DEFAULT NULL COMMENT '实际购买成功时间',
  `end_at` timestamp(0) NULL DEFAULT NULL COMMENT '到期时间',
  `recovery_at` timestamp(0) NULL DEFAULT NULL COMMENT '回收时间',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_no`(`order_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定期订单' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for regular_outputs
-- ----------------------------
DROP TABLE IF EXISTS `regular_outputs`;
CREATE TABLE `regular_outputs`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `asset_id` int(2) NOT NULL DEFAULT 0,
  `regular_id` int(11) NOT NULL COMMENT '活期产品id',
  `product_id` int(11) NOT NULL DEFAULT 0,
  `output` decimal(18, 6) NOT NULL DEFAULT 0.000000 COMMENT '利息',
  `status` enum('RELEASING','PAUSED','FINSHED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'RELEASING',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定期-产出' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for regular_products
-- ----------------------------
DROP TABLE IF EXISTS `regular_products`;
CREATE TABLE `regular_products`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `simple_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品简称',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '产品名称',
  `labels` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签列表',
  `income` decimal(10, 4) NOT NULL DEFAULT 1.0000 COMMENT '预计年化',
  `income_refer` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '参考参数',
  `history_income` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '历史年化',
  `min_pay` int(6) NOT NULL DEFAULT 10 COMMENT '最小购买',
  `pay_t_n` int(6) NOT NULL DEFAULT 1 COMMENT 't+n',
  `contract_days` int(6) NOT NULL DEFAULT 30 COMMENT '合同天数',
  `contract_day_msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列表中显示字样',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '主图',
  `deadlined_at` timestamp(0) NULL DEFAULT NULL COMMENT '截至日期',
  `raised_number` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '派息份数',
  `raised_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '募集金额',
  `redeem_amount` decimal(18, 8) NULL DEFAULT 0.00000000,
  `interest_amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '派息金额',
  `status` enum('CREATED','ENABLED','PAUSED','OUTSTOCK','NOPASS') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED' COMMENT '状态',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定期产品' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for state_user_peports
-- ----------------------------
DROP TABLE IF EXISTS `state_user_peports`;
CREATE TABLE `state_user_peports`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_total` int(11) NULL DEFAULT 0 COMMENT '注册总数',
  `new_user` int(11) NULL DEFAULT 0 COMMENT '新客人数',
  `old_user` int(11) NULL DEFAULT 0 COMMENT '老客人数',
  `today_register_num` int(11) NULL DEFAULT 0 COMMENT '今日注册数',
  `user_uv` int(11) NULL DEFAULT 0 COMMENT '用户访客数',
  `user_pv` int(11) NULL DEFAULT 0 COMMENT '用户浏览量',
  `user_deal_amount` decimal(16, 4) NULL DEFAULT 0.0000 COMMENT '用户成交金额',
  `user_deal_num` int(11) NULL DEFAULT 0 COMMENT '用户成交人数',
  `user_price` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '用户成交金额/用户成交人数',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户状态报告,每日通过任务统计' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_certification
-- ----------------------------
DROP TABLE IF EXISTS `user_certification`;
CREATE TABLE `user_certification`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户id',
  `type` int(2) NOT NULL DEFAULT 1 COMMENT '1个人2机构',
  `real_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '真实姓名',
  `nationality` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国家/地区',
  `cardtype` tinyint(4) NULL DEFAULT NULL COMMENT '证件类型1身份证2护照',
  `cardnumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '证件号',
  `id_front` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '正面',
  `id_back` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '反面',
  `id_hold` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '手持',
  `id_bl` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '营业执照',
  `id_auth` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '授权证明',
  `inst_bl_number` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '营业执照号码',
  `inst_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '机构名称',
  `inst_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '机构类型1企业',
  `admin_notes` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '管理员审核备注',
  `admin_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '管理员名称',
  `admin_time` timestamp(0) NULL DEFAULT NULL COMMENT '管理员审核时间',
  `status` tinyint(5) NOT NULL DEFAULT 1 COMMENT '状态:1审核中,2认证成功,3认证失败',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_type`(`user_id`, `type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 144 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户认证' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_collection
-- ----------------------------
DROP TABLE IF EXISTS `user_collection`;
CREATE TABLE `user_collection`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `type` tinyint(1) NOT NULL COMMENT '1微信2支付宝3银行卡',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信/支付宝收款码',
  `bank` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '银行',
  `bank_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开户行',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户绑定支付' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_levels
-- ----------------------------
DROP TABLE IF EXISTS `user_levels`;
CREATE TABLE `user_levels`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `devoted_score_need` int(11) NULL DEFAULT 0 COMMENT '到该级别需要的个人自购分',
  `granted_score_need` int(11) NULL DEFAULT 0 COMMENT '需要个人奖励分',
  `team_score_need` int(11) NULL DEFAULT NULL COMMENT '需要的团队积分',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_task_reward
-- ----------------------------
DROP TABLE IF EXISTS `user_task_reward`;
CREATE TABLE `user_task_reward`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NULL DEFAULT 0 COMMENT '任务id',
  `user_id` int(11) NOT NULL COMMENT '用户信息',
  `invite_id` int(11) NOT NULL COMMENT '被邀请id',
  `asset_id` int(11) NOT NULL DEFAULT 3,
  `reward` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '奖励额度',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'task' COMMENT '类型',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '任务描述',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '邀请结果' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_tasks
-- ----------------------------
DROP TABLE IF EXISTS `user_tasks`;
CREATE TABLE `user_tasks`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'regular',
  `condition` int(11) NOT NULL DEFAULT 1 COMMENT '条件',
  `condition_day` int(11) NOT NULL DEFAULT 1 COMMENT '天数',
  `reward` int(11) NOT NULL DEFAULT 1 COMMENT '奖励',
  `asset_id` int(11) NOT NULL DEFAULT 3 COMMENT '资产id',
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '邀请产品列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `mobile_prefix` int(10) NULL DEFAULT 86,
  `referrer_id` int(11) NULL DEFAULT 0,
  `referral_code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email_verified_at` timestamp(0) NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `security_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_level_id` int(11) NULL DEFAULT 1 COMMENT '身份',
  `user_type` int(2) NULL DEFAULT 0 COMMENT '用户类型0未认真，1个人，2机构',
  `risk_type` int(2) NULL DEFAULT 0 COMMENT '风险类型0未测试1保险2稳健3平衡4成长5进取',
  `status` int(2) NULL DEFAULT 0 COMMENT '状态0正常，1停用，2冻结',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'images/avatar.png' COMMENT '头像',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '最近登录ip',
  `user_pv` int(11) NULL DEFAULT 0 COMMENT '当日访问接口次数',
  `last_online_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '最近登录',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email_unique`(`email`) USING BTREE,
  UNIQUE INDEX `mobile_unique`(`mobile`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10000006 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_account_asset_changes
-- ----------------------------
DROP TABLE IF EXISTS `wallet_account_asset_changes`;
CREATE TABLE `wallet_account_asset_changes`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `wallet_account_id` int(11) NULL DEFAULT NULL COMMENT '对应钱包账户id',
  `wallet_account_asset_id` int(11) NULL DEFAULT NULL COMMENT '对应钱包子账户',
  `asset_id` int(11) NULL DEFAULT NULL COMMENT '关联代币id',
  `balance_change` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '余额变更',
  `pledge_change` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '质押变更',
  `freeze_change` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '冻结变更',
  `category_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '大标签',
  `reason_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '小标签',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  `morph_model` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '关联模型',
  `morph_id` int(11) NULL DEFAULT NULL COMMENT '关联模型id',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `zhsy`(`asset_id`, `category_code`, `reason_code`, `user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2796645 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包资产变更' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_account_asset_states
-- ----------------------------
DROP TABLE IF EXISTS `wallet_account_asset_states`;
CREATE TABLE `wallet_account_asset_states`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `wallet_account_id` int(11) NULL DEFAULT NULL,
  `wallet_account_asset_id` int(11) NULL DEFAULT NULL,
  `asset_id` int(11) NULL DEFAULT NULL,
  `balance` decimal(18, 8) NULL DEFAULT 0.00000000,
  `freeze` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000,
  `asset_rate` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '(没使用)'  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_account_assets
-- ----------------------------
DROP TABLE IF EXISTS `wallet_account_assets`;
CREATE TABLE `wallet_account_assets`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `wallet_account_id` int(11) NULL DEFAULT NULL,
  `asset_id` int(11) NULL DEFAULT NULL COMMENT '代币id',
  `balance` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '余额',
  `pledge` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '质押',
  `freeze` decimal(18, 8) UNSIGNED NULL DEFAULT 0.00000000 COMMENT '冻结',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1011 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包子账户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_account_secrets
-- ----------------------------
DROP TABLE IF EXISTS `wallet_account_secrets`;
CREATE TABLE `wallet_account_secrets`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `wallet_account_id` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address_hex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `private_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `public_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1009 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包私钥保存' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_accounts
-- ----------------------------
DROP TABLE IF EXISTS `wallet_accounts`;
CREATE TABLE `wallet_accounts`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ecosystem_id` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `dsn_account_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '以太坊地址或',
  `address_hex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `extend1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `extend2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1013 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包账户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_collections
-- ----------------------------
DROP TABLE IF EXISTS `wallet_collections`;
CREATE TABLE `wallet_collections`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `amount` decimal(11, 2) UNSIGNED NULL DEFAULT 0.00,
  `asset_id` int(11) NULL DEFAULT NULL,
  `tx_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `admin_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('CREATED','AUDITED','SENT','SUCCEEDED','FAILED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'CREATED',
  `sent_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包-自提记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_deposits
-- ----------------------------
DROP TABLE IF EXISTS `wallet_deposits`;
CREATE TABLE `wallet_deposits`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `wallet_account_id` int(11) NULL DEFAULT NULL,
  `wallet_account_asset_id` int(11) NULL DEFAULT NULL,
  `asset_id` int(11) NULL DEFAULT NULL,
  `amount` double UNSIGNED NULL DEFAULT 0 COMMENT '数额',
  `tx_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '交易id',
  `nonce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '发送方',
  `to` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '接收者',
  `network` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'USDT-TRC20' COMMENT '充值网络',
  `collect_status` enum('NO','GASING','SENT','SUCCESS','SENTTO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'NO' COMMENT '状态',
  `collect_txid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `last_collected_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `txId`(`tx_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包-充值记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_transfers
-- ----------------------------
DROP TABLE IF EXISTS `wallet_transfers`;
CREATE TABLE `wallet_transfers`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) NULL DEFAULT 0,
  `from_user_id` int(11) NULL DEFAULT NULL,
  `from_account_id` int(11) NULL DEFAULT NULL,
  `from_mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `to_user_id` int(11) NULL DEFAULT NULL,
  `to_account_id` int(11) NULL DEFAULT NULL,
  `to_mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amount` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '金额',
  `fee` decimal(18, 8) NULL DEFAULT 0.00000000 COMMENT '手续费',
  `status` enum('CREATED','AUDITED','SENT','SUCCEEDED','FAILED','CANCELED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'CREATED',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '钱包-转账记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_withdraw_address
-- ----------------------------
DROP TABLE IF EXISTS `wallet_withdraw_address`;
CREATE TABLE `wallet_withdraw_address`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `asset_id` int(2) NULL DEFAULT NULL COMMENT '资产类型',
  `network` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '地址',
  `default` int(2) NULL DEFAULT 0 COMMENT '默认',
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '提现地址铺' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for wallet_withdraws
-- ----------------------------
DROP TABLE IF EXISTS `wallet_withdraws`;
CREATE TABLE `wallet_withdraws`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `wallet_account_id` int(11) NULL DEFAULT NULL,
  `wallet_account_asset_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `asset_id` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '提现地址',
  `amount` double UNSIGNED NULL DEFAULT 0 COMMENT '提现金额',
  `fee` double UNSIGNED NULL DEFAULT NULL COMMENT '手续费',
  `tx_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '交易的hash',
  `network` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'USDT-TRC20',
  `status` enum('CREATED','AUDITED','SENT','SUCCEEDED','FAILED','CANCELED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'CREATED',
  `admin_name` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '管理员名称',
  `admin_log` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '管理员日志',
  `admin_at` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '管理员操作时间',
  `sent_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '钱包-提现记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zamples
-- ----------------------------
DROP TABLE IF EXISTS `zamples`;
CREATE TABLE `zamples`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '复制表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
