localStorage['requested'], localStorage['crequested']=0;
$(".post .author_box").live("click",function(){
 $(this).find(".author_panel").toggle();
});
$(".de_post").live("click",function(){
 id=$(this)[0].id;
 cfm=confirm("Are you really sure that you want to delete this post ?");
 if(cfm==true){
  post("delete_post",{id:id},"Deleted Post","Failed To Delete Post","Deleting");
 }
});
$(".post .pst.like").live("click",function(){
 t=$(this);
 id=t[0].id;
 co=$("#"+id+".lk.count");
 k=t.text()=="Like" ? "Unlike":"Like";
 t.text(k);
 n=t.text()=="Like" ? parseFloat(co.text())-1:parseFloat(co.text())+1;
 co.text(n);
 $.post(ht+"/ajax/like",{id:id}).error(function(){
  t.text(k);
  t.click();
 });
});
$(".post .cmt.like").live("click",function(){
 t=$(this);
 id=t[0].id;
 co=$(".comments").find("#"+id+".lk.count");
 k=t.text()=="Like" ? "Unlike":"Like";
 t.text(k);
 n=t.text()=="Like" ? parseFloat(co.text())-1:parseFloat(co.text())+1;
 co.text(n);
 $.post(ht+"/ajax/clike",{id:id}).error(function(){
  t.text(k);
  t.click();
 });
});
$(".post .cmt").live("click",function(){
 id=$(this)[0].id;
 c=$("#"+id+".comments");
 c.toggle();
 c.find("input[name=cmt]").focus();
});
$(".comment .author_cmt_box").live("click",function(){
 $(this).find(".author_cmt_panel").toggle();
});
$(".de_cmt").live("click",function(){
 id=$(this)[0].id;
 post("delete_cmt",{id:id},"Deleted Comment","Failed To Delete Comment","Deleting");
});
$(".reply_cmt").live("click",function(){
 id=$(this).attr("id");
 $("#"+id+".cmt_form").find("input[name=cmt]").val("@"+$(this).attr("data-user")+" ");
 $("#"+id+".cmt_form").find("input[name=cmt]").focus();
 scrollTo($("#"+id+".cmt_form").offset().top);
});
function load_more_posts(){
 var ID=$(".post:last").attr("id");
 t=$(".load_more_posts");
 t.find(".normal").hide();
 t.find(".loader").show();
 if(window.location.pathname=="/view"){
  return false;
 }
 if($("meta[name=type]").length!=0){
  var aer=$("meta[name=oid]").attr("value");
 }
 if($("meta[name=type]").length!=0){
  var pd={uid:aer,id:ID};
  if($(".noggler#feed").is(":hidden")){
   return false;
  }
 }else if(window.location.pathname.match("search")!=null){
  var query=window.location.href.split('q=')[1];
  if(query==undefined){query="";}
  if(query.match("&")){query=query.split('&')[0];}
  var pd={id:ID,q:query};
 }else{
  var pd={id:ID};
 }
 if(localStorage['requested']==0){
  post('load_posts',pd,"Successfuly loaded Posts","Loading More Posts failed","Loading");
  localStorage['requested']=1;
 }
}
$(window).scroll(function(){
 if($(window).scrollTop() + $(window).height() == $(document).height() && $(".post").length!=0){
  load_more_posts();
 }
});
$(".load_more_posts .normal").live("click",function(){
 load_more_posts();
});
$(".suggestions .follow").die("click").live("click",function(event){
 $(this).parents(".sugg").remove();
 $.get(ht+"/comps/suggest",function(d){
  $(".suggestions").replaceWith(d);
 });
});
$(".load_more_comments").live("click",function(){
 var ID=$(this).attr("id");
 var pd={id:ID};
 if(localStorage['crequested']==0){
  post('load_cmts',pd,"Successfuly loaded Comments","Loading More Comments failed","Loading");
  localStorage['crequested']=1;
 }
});
$(".textEditor").smention(ht+"/ajax/get_users",{
 avatar:true,
 width:300
});
