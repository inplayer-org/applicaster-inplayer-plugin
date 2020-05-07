import R from "ramda";

export let jwLicenceKey = (pluginConfiguration) => {
  return pluginConfiguration?.jw_player_android_key;
};

export let playListItem = (props) => {
  const {
    source: { uri },
    playableItem,
    controls: customControls,
  } = props;

  const { title = null, summary = null } = playableItem;

  const image = imageFromPlayableItem(playableItem);
  //"https://cdn.jwplayer.com/manifests/3IAGTDeS.m3u8",
  const retVal = {
    title,
    mediaId: advertismentMediaId(playableItem),
    image,
    desc: summary,
    time: 0,
    file: "https://cdn.jwplayer.com/manifests/3IAGTDeS.m3u8",
    autostart: true,
    controls: customControls,
    repeat: false,
    displayDescription: true,
    displayTitle: true,
  };
  console.log("Playlist Item", { retVal });
  return retVal;
};

export let advertismentMediaId = (playableItem) => {
  const { id: entryId } = playableItem;
  return entryId || "-1";
};

export let imageFromPlayableItem = R.compose(
  R.prop("src"),
  R.find(R.propEq("key", "image_base")),
  R.prop("media_item"),
  R.ifElse(Array.isArray, R.head, R.always(null)),
  R.prop("media_group")
);
