import { useState, useEffect } from "react";
import Avatar from "./sidebar/Avatar";
import UserInfoForm from "./sidebar/UserInfoForm";
import PortfolioForm from "./sidebar/PortfolioForm";
import SkillsPanel from "./sidebar/SkillsPanel";
import LanguagesPanel from "./sidebar/LanguagesPanel";
import LinksPanel from "./sidebar/LinksPanel";

export default function ProfileSideBar({ user, portfolio, skills, languages, links, canEdit, edit, onRefresh, profileImage, avatarInputRef }) {

    const levelMap = {
        1: "Beginner",
        3: "Competent",
        5: "Proficient",
    };

    return (
        <aside className="profile-sidebar">

            <Avatar
                avatarInputRef={avatarInputRef}
                profileImage={profileImage}
                canEdit={canEdit}
            />
            <UserInfoForm
                initialUser={user}
                canEdit={canEdit}
                edit={edit}
                onRefresh={onRefresh}
            />

            <PortfolioForm
                initialPortfolio={portfolio}
                canEdit={canEdit}
                edit={edit}
                onRefresh={onRefresh}
            />

            <SkillsPanel
                initialSkills={skills}
                portfolioID={portfolio.id}
                canEdit={canEdit}
                edit={edit}
                levelMap={levelMap}
                onRefresh={onRefresh}
            />

            <LanguagesPanel
                initialLanguages={languages}
                portfolioID={portfolio.id}
                canEdit={canEdit}
                edit={edit}
                levelMap={levelMap}
                onRefresh={onRefresh}
            />

            <LinksPanel
                initialLinks={links}
                portfolioID={portfolio.id}
                canEdit={canEdit}
                edit={edit}
                onRefresh={onRefresh}
            />
        </aside>
    )
}

external