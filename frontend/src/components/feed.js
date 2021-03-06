import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ad_perfil from "../images/perfilP.jpg";
import "../styles/components/feed.css";
import api from "../services/api";

function Feed() {
  const userId = localStorage.getItem("userId");

  const [ads, setAds] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState([]);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    async function loaddata() {
      await api
        .get("/products", {
          headers: {
            Authorization: userId,
          },
        })
        .then((response) => {
          setAds(response.data);
        });
    }
    loaddata();
  }, [userId]);

  useEffect(() => {
    async function loaddata() {
      await api
        .get("/images", {
          headers: {
            Authorization: userId,
          },
        })
        .then((response) => {
          setImages(response.data);
        });
    }
    loaddata();
  }, [userId]);

  useEffect(() => {
    async function loaddata() {
      await api
        .get(`/users`, {
          headers: {
            Authorization: userId,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
    loaddata();
  }, [userId]);

  useEffect(() => {
    async function loaddata() {
      await api
        .get(`/categorys`, {
          headers: {
            Authorization: userId,
          },
        })
        .then((response) => {
          setCategorys(response.data);
        });
    }
    loaddata();
  }, [userId]);

  return (
    <div>
      {categorys.map((category) => (
        <div key={category.id}>
          <h1 className="feed__filter">{`#${category.name}`}</h1>
          <div className="feed__container">
            {ads.map((ad) => 
              ad.category_id === category.id ?
            (
              <div key={ad.id} className="feed__ad">
                <div className="feed__wrapper--image">
                  {images.map((image) =>
                    image.product_id === ad.id ? (
                      <Link to={`/advert/${ad.id}`} key={image.id}>
                        <div className="ad__image">
                          <img
                            src={`http://localhost:3333/files/images/${image.path}`}
                            alt="anuncio"
                          />
                        </div>
                      </Link>
                    ) : (
                      ""
                    )
                  )}
                </div>
                <div className="ad__informations">
                  {user.map((user) =>
                    ad.user_id === user.id ? (
                      <div key={user.id} className="userphoto">
                        <img
                          src={
                            user.profile_path !== "undefined"
                              ? `http://localhost:3333/files/profile/picture/${user.profile_path}`
                              : ad_perfil
                          }
                          alt="foto_perfil"
                        ></img>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                  <div className="ad__informations--left">
                    <p>{ad.title}</p>
                    {categorys.map((category) =>
                      ad.category_id === category.id ? (
                        <span key={category.id}>{category.name}</span>
                      ) : (
                        ""
                      )
                    )}
                    <h3>{`R$ ${ad.price}`}</h3>
                  </div>
                </div>
              </div>
            ):"")}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
