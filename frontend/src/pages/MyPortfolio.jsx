import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileSideBar from "../components/portfolio/ProfileSideBar";
import ProfileHeader from "../components/portfolio/ProfileHeader";
import ProfileTabs from "../components/portfolio/ProfileTabs";
import usePortfolio from "../hooks/usePortfolio";
import useFilesUpload from "../hooks/useFilesUpload";


export default function MyPortfolio({ canEdit }) {
  const { id } = useParams();
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const edit = canEdit && "✐"

  const {
    portfolio,
    setPortfolio,
    user,
    setUser,
    projects,
    skills,
    languages,
    links,
    files,
    certificates,
    resume,
    profileImage,
    setCoverImage,
    setCertificates,
    setProfileImage,
    coverImage,
    fetchPortfolio
  } = usePortfolio(id, canEdit)

  const {
    handleFileChange
  } = useFilesUpload(
    files,
    portfolio.id,
    null,
    fetchPortfolio
  );

  return (<>
    <input type="file" name="profile_image" accept="image/*" ref={avatarInputRef} style={{ display: 'none' }} onChange={handleFileChange} disabled={!canEdit} />
    <input type="file" name="portfolio_cover" accept="image/*" ref={coverInputRef} style={{ display: 'none' }} onChange={handleFileChange} disabled={!canEdit} />

    {/* الحاوية الخارجية الكبرى الموحدة */}
    <div className="portfolio-page-wrapper">
      <div className="profile-page-container">

        {/* العمود الأيسر: السايدبار يظل في البداية ليكون على اليسار */}
        <ProfileSideBar
          user={user}
          portfolio={portfolio}
          skills={skills}
          languages={languages}
          links={links}
          canEdit={canEdit}
          edit={edit}
          onRefresh={fetchPortfolio}
          profileImage={profileImage}
          avatarInputRef={avatarInputRef}
        />

        {/* العمود الأيمن بالكامل: حاوية مشتركة تجمع الهيدر وتحته المشاريع */}
        <div className="portfolio-main-tabs-wrapper">

          {/* الغلاف (Header) بالأعلى تماماً داخل الجانب الأيمن */}
          <div className="portfolio-cover-wrapper">
            <ProfileHeader
              coverInputRef={coverInputRef}
              cover={coverImage}
              canEdit={canEdit}
            />
          </div>

          {/* التبويبات والمشاريع تأتي مباشرة أسفل الغلاف */}
          <ProfileTabs
            Projects={projects}
            initialFiles={files}
            resume={resume}
            canEdit={canEdit}
            portfolioID={portfolio.id}
            refresh={fetchPortfolio}
          />

        </div>
      </div>
    </div>
  </>);
}
