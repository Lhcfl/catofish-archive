//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.15

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq)]
#[sea_orm(table_name = "user_group")]
#[cfg_attr(
    feature = "napi",
    napi_derive::napi(object, js_name = "UserGroup", use_nullable = true)
)]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: DateTime,
    pub name: String,
    #[sea_orm(column_name = "userId")]
    pub user_id: String,
    #[sea_orm(column_name = "isPrivate")]
    pub is_private: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::messaging_message::Entity")]
    MessagingMessage,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    User,
    #[sea_orm(has_many = "super::user_group_invitation::Entity")]
    UserGroupInvitation,
    #[sea_orm(has_many = "super::user_group_invite::Entity")]
    UserGroupInvite,
    #[sea_orm(has_many = "super::user_group_joining::Entity")]
    UserGroupJoining,
}

impl Related<super::messaging_message::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::MessagingMessage.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl Related<super::user_group_invitation::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::UserGroupInvitation.def()
    }
}

impl Related<super::user_group_invite::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::UserGroupInvite.def()
    }
}

impl Related<super::user_group_joining::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::UserGroupJoining.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
