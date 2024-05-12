import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { SidebarContext } from '../../context/SideBarContext';
import { BiDislike, BiLike } from 'react-icons/bi';
import { RiFlagLine, RiShareForwardLine } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';
import dayjs from 'dayjs';
import formatNumber from '../../helpers/formatNumber';
import formatViews from '../../helpers/formatViews';
import formatText from '../../helpers/formatText';
import axios from '../../api/axios';
import ralativeTime from 'dayjs/plugin/relativeTime';
import RelatedVideos from './RelatedVideos';

const VideoPage = () => {
  dayjs.extend(ralativeTime);
  const { videoId } = useParams();
  let location = useLocation();
  const { state: currentVideo } = location;

  const { setIsToggled } = useContext(SidebarContext);

  const views = formatNumber(currentVideo.channelInfo.subscriberCount);
  const comments = formatNumber(currentVideo.extraInfo.commentCount);

  const likes = formatViews(currentVideo.extraInfo.likeCount);
  const dislikes = formatViews(currentVideo.extraInfo.dislikeCount);
  const subscribers = formatViews(currentVideo.channelInfo.subscriberCount);

  const videoDescription = formatText(currentVideo.snippet.description);

  const [videoComments, setVideoComments] = useState([]);

  const loadComment = useCallback(async () => {
    setIsToggled(false);
    const response = await axios.get(`/commentThreads?part=snippet&videoId=${videoId}`);
    setVideoComments(response.data.items);
  }, [setIsToggled, videoId]);

  useEffect(() => {
    loadComment();
  }, [loadComment]);

  const onPlayReady = (e) => {
    e.target.playVideo();
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const videoCommentsMarkup = videoComments.map((item) => {
    const { id, snippet } = item.snippet.topLevelComment;
    return (
      <div className="comment_container" key={id}>
        <div className="comment_avatar_container">
          <img src={snippet.authorProfileImageUrl} alt="user avatar" />
        </div>
        <div className="comment_text_container">
          <div className="comment_author">{snippet.authorDisplayName}</div>
          <span>{dayjs(snippet.publishedAt).fromNow()}</span>
          <div className="comment_text">{snippet.textOriginal}</div>
          <div className="comment_buttons">
            <div>
              <BiLike size={16} />
              <span className="muted">{snippet.likeCount}</span>
            </div>
            <div>
              <BiDislike size={16} />
            </div>
            <span className="muted">REPLY</span>
          </div>
        </div>
      </div>
    );
  });

  const videoHeaderMarkUp = (
    <div className="video_main_info">
      <div className="tags">
        {currentVideo.snippet.tags.map((tag, i) => (
          <p className="tag" key={i}>
            #{tag}
          </p>
        ))}
      </div>
      <h1>{currentVideo.snippet.title}</h1>
      <div className="videoplayer_metadata">
        <span>{views} views</span>
        <span className="dot_separator"> &#8226; </span>
        <span>{dayjs(currentVideo.snippet.publishedAt).format('MMM D, YYYY')}</span>
      </div>
    </div>
  );

  return (
    <section className="videoPage">
      <div className="columns_container">
        <div className="column column_1">
          <div className="youtube_player_container">
            <YouTube className="youtube_player" videoId={videoId} onPlay={onPlayReady} opts={opts} />;
            <div className="videoplayer_info">
              {videoHeaderMarkUp}
              <div className="main_header_buttons">
                <div className="likes_container">
                  <div className="likes">
                    <BiLike size={25} />
                    <span>{likes}</span>
                  </div>
                  <div className="dislikes">
                    <BiDislike size={25} />
                    <span>{dislikes}</span>
                  </div>
                </div>
                <div className="share">
                  <RiShareForwardLine size={25} />
                  <span>SHARE</span>
                </div>
                <div className="save">
                  <MdPlaylistAdd size={25} />
                  <span>SAVE</span>
                </div>
                <div className="report">
                  <RiFlagLine size={25} />
                </div>
              </div>
            </div>
          </div>
          <div className="channel_video_info">
            <div className="channel_data">
              <div className="channel_avatar">
                <img src={currentVideo.channelInfo.thumbnails.default.url} alt="avatar" />
              </div>
              <div className="channel_title">
                <a href="/">{currentVideo.channelInfo.title}</a>
                <span>{subscribers} subscribers</span>
              </div>
              <div className="channel_subscribe">
                <button>SUBSCRIBED</button>
              </div>
            </div>
            <div className="video_description">{videoDescription}</div>
          </div>
          <div className="video_comments_container">
            <div className="video_comments_count">{comments} Comments</div>
            <div className="video_comments">{videoCommentsMarkup}</div>
          </div>
        </div>
        <div className="column column_2">
          <RelatedVideos currentVideo={currentVideo} />
        </div>
      </div>
    </section>
  );
};

export default VideoPage;
