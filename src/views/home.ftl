<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test ftl</title>
	<link rel="stylesheet" href="./css/app.css">
</head>
<body class="page_home">
	<h1>你的微笑</h1>
    <#include './include/include.ftl'>
    <ul>
	    <li>姓名: ${user.name}</li>
        <li><input type='text' /></li>
    </ul>
    <script src="js/home.js"></script>
</body>
</html>
