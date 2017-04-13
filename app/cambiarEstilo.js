$('#est1').click(function (){
   $('link[href="css/style2.css"]').attr('href','css/style1.css');
   $('meta[name="theme-color"]').attr('content','#000000');
});
$('#est2').click(function (){
   $('link[href="css/style1.css"]').attr('href','css/style2.css');
   $('meta[name="theme-color"]').attr('content','#ffffff');
});