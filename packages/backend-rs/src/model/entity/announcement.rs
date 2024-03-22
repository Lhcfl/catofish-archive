//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.15

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq)]
#[sea_orm(table_name = "announcement")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: DateTimeWithTimeZone,
    pub text: String,
    pub title: String,
    #[sea_orm(column_name = "imageUrl")]
    pub image_url: Option<String>,
    #[sea_orm(column_name = "updatedAt")]
    pub updated_at: Option<DateTimeWithTimeZone>,
    #[sea_orm(column_name = "showPopup")]
    pub show_popup: bool,
    #[sea_orm(column_name = "isGoodNews")]
    pub is_good_news: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::announcement_read::Entity")]
    AnnouncementRead,
}

impl Related<super::announcement_read::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::AnnouncementRead.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
