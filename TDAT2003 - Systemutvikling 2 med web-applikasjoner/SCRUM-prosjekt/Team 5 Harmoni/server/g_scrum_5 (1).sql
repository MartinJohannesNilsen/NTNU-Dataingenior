-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 17. Jan, 2020 11:09 AM
-- Tjener-versjon: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g_scrum_5`
--
CREATE DATABASE IF NOT EXISTS `g_scrum_5` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `g_scrum_5`;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Category`
--

DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Category`
--

INSERT INTO `Category` (`category_id`, `name`) VALUES
(1, 'Forelesning'),
(2, 'Konsert'),
(3, 'Fest');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Comment`
--

DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Contact_Info`
--

DROP TABLE IF EXISTS `Contact_Info`;
CREATE TABLE `Contact_Info` (
  `contact_info_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `email` varchar(320) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Contact_Info`
--

INSERT INTO `Contact_Info` (`contact_info_id`, `name`, `phone`, `email`, `event_id`) VALUES
(14, 'jdnajsnd', 'jdn', 'djnasjnd', 129),
(15, 'Dag', '45005502', 'dag.gronstad@gmail.com', 130),
(16, 'Martin Johannes Nilsen', '45005502', 'mjn@icloud.com', 131),
(23, 'Hunden', 'Birk', 'birk@mail.com', 138),
(25, 'Max T. Schau', '91782159', 'max.torre.schau@gmail.com', 140),
(28, 'sdf', '91782159', 'max.torre.schau@gmail.com', 143),
(30, 'jdn', 'jnd', 'jn', 171),
(31, 'test', 'test', 'test', 172);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Event`
--

DROP TABLE IF EXISTS `Event`;
CREATE TABLE `Event` (
  `event_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `place` varchar(40) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `img_url` text,
  `artists` varchar(100) NOT NULL,
  `tech_rider` longtext NOT NULL,
  `hospitality_rider` longtext,
  `contract` longtext,
  `personnel` text,
  `filed` tinyint(4) NOT NULL DEFAULT '0',
  `pending` tinyint(4) NOT NULL DEFAULT '1'
  `canceled` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Event`
--

INSERT INTO `Event` (`event_id`, `name`, `description`, `date`, `place`, `category_id`, `img_url`, `artists`, `tech_rider`, `hospitality_rider`, `contract`, `personnel`, `filed`, `pending`) VALUES
(114, 'Kjør da utekatt', 'Hell yeah', '2020-01-15 20:00:00', 'Kalvskinnet ', 1, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', 'Abba', 'files-1579088822745.docx', 'files-1579088822745.docx', NULL, 'files-1579088822744.docx', 1, 1),
(116, 'Max Torre Schau', '', '2020-01-15 20:00:00', '', 1, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', '', '', '', NULL, '', 1, 1),
(117, 'Max Torre Schau!!', '', '2020-01-15 20:00:00', '', 1, 'files-1579089064411.png', '', 'files-1579089064410.docx', 'files-1579089064410.docx', NULL, 'files-1579089064409.docx', 1, 1),
(118, 'Donn Cryptokurs', '', '2020-01-15 20:00:00', '', 1, 'files-1579090366979.JPGf32fbc17-e0e1-479c-975e-8afd3c8fb29a', '', 'files-1579090366978.docx9f04bda9-3f93-4191-9f08-1ea409900953', 'files-1579090366978.docx9f04bda9-3f93-4191-9f08-1ea409900953', NULL, 'files-1579090366978.docxc8cfe3b0-640d-4d52-af2f-d5dd00079550', 1, 1),
(119, 'Donn Cryptokurs v3', '', '2020-01-15 20:00:00', '', 1, 'files-1579090458345a58b7698-0761-4aca-bdf3-aaa17bae80a7.JPG', '', 'files-1579090458343af5cbac4-7d81-4e08-980e-b830ba542f46.docx', 'files-1579090458343af5cbac4-7d81-4e08-980e-b830ba542f46.docx', NULL, 'files-1579090458342209f2c90-17b3-4229-a4c9-ac1898fc2575.docx', 1, 1),
(120, 'Max kødder så masse', '', '2020-01-15 20:00:00', '', 1, 'files-157909062973744827853-12f1-4e8a-b583-a148f2b7fd2e.JPG', '', 'files-15790906297369756005b-2c6e-4e2a-a72b-b20d8e6db277.docx', 'files-1579090629737e6e23e2f-c89f-436e-a99b-537e29cc5c4f.docx', NULL, 'files-157909062973521bdd9c5-38ac-4d46-8200-276eeadeaf97.docx', 1, 0),
(122, 'MArtin', 'halla', '2020-01-16 16:03:00', 'sukkerhuset', 3, 'files-1579092204056d0182135-8f18-46e3-877c-8bf10d1cf992.png', 'martin', 'files-15790922040568efd1637-bc33-4ca6-beb0-c7ea9f873ecc.png', 'files-1579092204056a7ae4867-a087-49ca-8428-8aa186c195dd.png', NULL, 'files-1579092204055ef1142da-cce1-41ce-a3e9-691026cc523e.png', 1, 1),
(124, 'funker dette?', 'ijioj', '2020-01-17 20:00:00', 'oijioj', 3, 'files-157909241930688bdd931-c900-4cb5-8bc8-f64c3065bc46.jpg', 'oijoi', 'files-157909241928844fb86c0-ad1e-4246-8ffa-b74b0e8b680b.jpg', 'files-1579092419294d21333d2-22be-4733-82d9-778064a9702b.jpg', NULL, 'files-157909241928791733e9d-90b9-4c93-964f-8a42c3449159.png', 1, 1),
(125, 'funker dette?', 'ijioj', '2020-01-17 20:00:00', 'oijioj', 3, 'files-1579092441655d28ad272-adf8-413e-80c9-0da733d9dad7.jpg', 'oijoi', 'files-157909244164361f57b42-faa9-42ae-bd75-b35e066b97b1.jpg', 'files-15790924416439e2e29e1-a6ad-4a4a-8e6f-f24ee367973c.jpg', NULL, 'files-1579092441642fa36f00e-5a29-4e94-88af-105b6c85ef01.png', 1, 1),
(129, 'sk', 'sdf', '2020-01-15 20:00:00', 'dknasjdn', 2, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', 'jdnasjdn', '', '', '', '', 1, 1),
(130, 'Dag', 'noe', '2020-01-23 21:00:00', 'Moss', 1, 'files-1579093739220d8295788-fe82-42df-9c56-82799b46c47c.jpg', 'martin', 'files-15790937392184e52052a-35b0-4bf2-9b1e-5d4cdc3c6abd.txt', 'files-15790937392190d031b06-42e3-4115-b2d2-426062780ac9.txt', NULL, 'files-15790937392171846b1f9-00ff-4492-9e41-cbdfb485736e.txt', 1, 1),
(131, 'Martin Johannes Nilsen', 'halla', '2020-01-15 20:00:00', 'Trondheim', 1, 'files-15790939227664a921627-b551-4b15-bba7-b1c4939097c7.jpg', 'martin', 'files-15790939227654c335ca2-ff2d-4221-acba-5f5f4ce22810.txt', 'files-1579093922766da26a060-0ab3-41fb-bb26-f3cb28e23e21.txt', 'files-1579093922757e3ab92c5-014c-421c-8f47-72acb93b7e2a.txt', 'files-157909392276398956e90-c7e5-4023-bd5b-c7e9db1161f3.txt', 1, 1),
(138, 'Test3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar rutrum euismod. Nullam molestie, erat nec porta vehicula, nunc nunc mattis lorem, et elementum nisi urna vel ligula. Duis ac justo sit amet ipsum porta convallis ac eget eros. Fusce purus nibh, lacinia ut laoreet in, ultricies ut felis. Ut non quam venenatis orci varius gravida et in magna. Sed sed varius ex. Praesent pretium metus a bibendum tempor. Sed lobortis tortor aliquam neque sodales tincidunt.  Maecenas vitae laoreet augue. Phasellus porta arcu at condimentum tempor. Quisque viverra laoreet vehicula. Donec sagittis auctor ex viverra consectetur. In sit amet posuere purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque pulvinar elit nisi, a hendrerit lectus tincidunt et. Sed quis laoreet mi. Curabitur volutpat eros in ligula lobortis, condimentum consequat tortor condimentum. Suspendisse dui lorem, malesuada vel sem eu, ullamcorper vestibulum tellus.  Nulla id lorem blandit, rutrum mauris et, hendrerit ante. Maecenas dapibus tempor ante sed sagittis. Phasellus mollis eu urna at bibendum. Fusce iaculis volutpat risus vel dictum. Suspendisse sed eros vitae nisi vehicula tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam aliquam ante erat, sed finibus purus imperdiet commodo. Suspendisse quis fringilla tortor, nec dictum ligula. In tristique est sed luctus mollis. Aliquam pretium mi quis consequat fringilla.  Nam ullamcorper facilisis lectus, vitae pharetra dui vehicula sit amet. Duis sit amet aliquet lacus. Maecenas feugiat, est tincidunt molestie pulvinar, arcu felis ornare nisi, a congue urna turpis vel odio. Mauris tempor arcu sapien, vel suscipit velit mollis fringilla. Mauris faucibus sapien elit, in sagittis ipsum pellentesque at. Ut sagittis ipsum quis mi accumsan, a volutpat lacus finibus. Mauris gravida metus a odio eleifend, ac consequat ligula maximus. Quisque sit amet ex vel ante condimentum semper. Mauris felis ligula, egestas vel dictum et, mollis vel dui. Aenean at sapien faucibus, iaculis ligula vel, iaculis risus. Proin maximus, nulla in fringilla egestas, nibh ligula aliquet nunc, ut facilisis nibh nibh non sem. Curabitur eleifend vehicula metus, ut pharetra dolor tincidunt ut. Curabitur dictum, eros ut sodales tincidunt, massa tellus pellentesque ex, sit amet ullamcorper tortor urna fringilla ante. Duis sed nisi elementum, bibendum leo a, commodo ex. Mauris blandit eu lectus in auctor.  Donec sit amet congue nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent vitae massa gravida, auctor justo non, eleifend massa. In sed turpis euismod, condimentum magna ut, pellentesque magna. Ut scelerisque ligula ac lacus pharetra facilisis. Etiam vitae magna in erat posuere convallis sit amet fringilla erat. Duis accumsan quam non aliquam tristique.  Sed vitae iaculis ligula. Mauris ultrices vitae nisl fermentum luctus. Nunc maximus vitae eros a egestas. Sed in ante sed sapien malesuada vehicula dignissim id ante. Cras viverra ultrices urna, ac tincidunt sapien pharetra quis. Duis sit amet consectetur odio, a scelerisque magna. Fusce iaculis, quam eu commodo accumsan, nunc tortor pharetra lorem, in tempor ipsum nulla ut lacus. Maecenas ultricies condimentum erat ac scelerisque. Ut quis sapien id ex facilisis accumsan. Nulla eu porttitor quam. Cras pellentesque velit quis auctor laoreet. Donec risus dolor, semper in mollis sed, posuere ut ipsum. Pellentesque posuere facilisis erat ac mollis. Fusce quis quam non nisi efficitur consequat. In tincidunt dui et libero suscipit luctus.  In velit enim, facilisis posuere dapibus non, laoreet vel enim. Phasellus nec pretium tellus, ut luctus sapien. In vestibulum ligula eget nulla condimentum, a efficitur enim ornare. Sed varius varius turpis nec convallis. Vestibulum venenatis at neque sed accumsan. Pellentesque id lacus vel nibh dictum vestibulum et mollis odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec enim urna, venenatis eu turpis porta, fermentum consectetur mi. Nullam ornare, purus vitae cursus accumsan, tellus ipsum maximus orci, sit amet gravida risus mauris quis quam. Sed non quam convallis, dapibus orci consequat, dignissim diam. Sed malesuada, purus sed posuere suscipit, tellus leo cursus elit, id egestas turpis metus et arcu. Nunc aliquet ex egestas augue imperdiet condimentum. Aenean porttitor faucibus urna auctor pellentesque. Pellentesque bibendum, sapien id condimentum sollicitudin, nisl risus commodo justo, ut imperdiet ligula enim at diam.  Duis quis nisi orci. Sed sed quam eget magna commodo pretium. Duis consequat consectetur erat, scelerisque convallis leo posuere vitae. Maecenas porttitor malesuada elit tempus luctus. Donec iaculis lectus dui, in mollis ipsum auctor vel. Curabitur lorem ipsum, rutrum a augue posuere, malesuada elementum ante. Morbi vitae risus nec dolor aliquet semper ac ut magna. Proin imperdiet commodo mauris ut fermentum. Donec dapibus commodo nisl sollicitudin dictum. Sed lectus odio, viverra ut purus a, iaculis tempor ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec pretium fringilla consectetur.  Morbi lobortis quam sed enim pellentesque interdum. Vivamus ultricies eu lacus quis rhoncus. Quisque semper risus sed lacus vehicula tincidunt. Fusce gravida, odio sed mollis tempor, neque neque vehicula erat, vel sodales enim purus ut sapien. Praesent id diam commodo, semper massa vel, dapibus diam. Duis accumsan est in tristique luctus. Vestibulum at molestie diam, vitae ultricies nisi. Praesent justo neque, condimentum non dignissim a, dictum vitae magna. Praesent porttitor turpis a elit viverra mattis. Nulla ligula nisi, scelerisque a lacinia quis, viverra vel sapien. Sed id odio iaculis, cursus enim quis, sollicitudin mi. Aenean blandit dapibus nibh et congue. Etiam non velit vel nisi facilisis eleifend sit amet sed diam. Donec pellentesque venenatis scelerisque.  Nulla tempus turpis et risus aliquet, et facilisis purus sodales. Nullam at fringilla lacus. Praesent vestibulum sit amet urna at fringilla. Quisque consectetur varius sagittis. Duis sodales velit a turpis pretium, et varius dui imperdiet. Praesent nec libero dui. Mauris in pharetra leo. Mauris id leo molestie, tristique libero sed, porttitor est. Vestibulum lobortis orci feugiat nisi efficitur placerat. Ut eu bibendum lectus. Nullam fringilla, erat at vestibulum tempor, dui est dictum ante, ac ornare mauris est ac elit. Nullam et orci nec tellus faucibus facilisis. Etiam lacinia diam sed mi commodo, in auctor quam bibendum. Donec ullamcorper justo et lacus tincidunt placerat.', '2020-08-08 20:00:00', 'Hos Martin', 1, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', 'Hunder', '', '', '', '', 1, 1),
(140, 'Fotballkamp', 'Vålerenga møter LSK', '2020-01-23 20:00:00', 'Intility Arena', 1, 'files-157910005757770d17d22-8fa8-48dd-af3a-1702ae32b740.jpg', 'Vålerenga', 'files-15791000575758edc415a-2e83-43e8-8eae-ce78ec399b88.docx', 'files-1579100057576eb253d12-33dc-4ee3-9cac-bc11dc8dc7d4.docx', 'files-157910005757367a6f6d4-de36-4855-b75d-31ff53e21d3d.docx', 'files-1579100057575fb98d153-87b9-4d86-bb19-140d4a6e16bd.docx', 1, 1),
(143, 'DETTE MÅÅÅ GÅÅÅ', 'sdfdsf', '2020-01-15 20:00:00', 'sdf', 1, 'files-15791004624686e50a518-d99e-4221-a6ff-eb12ead903d0.jpg', 'sdf', 'files-1579100462468adf437fb-4cad-426a-8f50-634de97372c8.docx', 'files-157910046246824520530-5db1-4cea-bb30-2da52f2d3f4f.docx', 'files-15791004624677be80e04-be76-48b8-bd29-0425ea9bc7b4.docx', 'files-15791004624679a82c694-b5dc-4739-94c4-ef8c4cc35bfb.docx', 1, 1),
(151, 'Hundekos', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor libero eget turpis bibendum fringilla. Sed a aliquam arcu. Nullam vel sem sit amet tortor facilisis vestibulum ut sed justo. Sed vel finibus arcu. Sed pellentesque, augue non molestie laoreet, purus nisi consequat arcu, non venenatis risus elit vitae purus. Etiam consequat at massa eu hendrerit. Integer at imperdiet urna, at tincidunt mauris. Vestibulum nisi neque, ornare et euismod at, efficitur in sem.\r\n\r\nPraesent ornare massa nec varius efficitur. Proin non imperdiet erat. Maecenas tellus sem, interdum at ante nec, condimentum mollis elit. Ut tristique in ante eu pharetra. Sed cursus ligula quis eros tempor, eu maximus orci fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eros erat, efficitur eget pulvinar non, mattis at nibh. Mauris sit amet dolor nisi. Nam vestibulum suscipit sem et pretium. Etiam lobortis tellus a ante pulvinar tincidunt. Pellentesque sit amet orci imperdiet, vulputate dolor sit amet, dignissim elit. Cras molestie ipsum nec semper blandit. Etiam imperdiet iaculis lacinia.', '2020-04-01 20:00:00', 'Sukkerhuset', 1, 'files-157912049118706fecd6c-79d2-4499-bb89-c2384423fc6a.jpg', 'Per', 'files-15791204911863fdf10c4-1587-485a-9f8c-1c574e075619.txt', 'files-15791204911877f23d3c3-0a81-4a22-b669-9be479fe940f.txt', 'files-15791204911845f527c28-0051-4cc1-9a71-5da35622824a.txt', 'files-157912049118670dc525a-9268-464c-b88a-804a43c87e96.txt', 0, 0),
(154, 'Vålerenga', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor libero eget turpis bibendum fringilla. Sed a aliquam arcu. Nullam vel sem sit amet tortor facilisis vestibulum ut sed justo. Sed vel finibus arcu. Sed pellentesque, augue non molestie laoreet, purus nisi consequat arcu, non venenatis risus elit vitae purus. Etiam consequat at massa eu hendrerit. Integer at imperdiet urna, at tincidunt mauris. Vestibulum nisi neque, ornare et euismod at, efficitur in sem.\r\n\r\nPraesent ornare massa nec varius efficitur. Proin non imperdiet erat. Maecenas tellus sem, interdum at ante nec, condimentum mollis elit. Ut tristique in ante eu pharetra. Sed cursus ligula quis eros tempor, eu maximus orci fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eros erat, efficitur eget pulvinar non, mattis at nibh. Mauris sit amet dolor nisi. Nam vestibulum suscipit sem et pretium. Etiam lobortis tellus a ante pulvinar tincidunt. Pellentesque sit amet orci imperdiet, vulputate dolor sit amet, dignissim elit. Cras molestie ipsum nec semper blandit. Etiam imperdiet iaculis lacinia.', '2020-12-10 15:00:00', 'Kristiansand', 2, 'files-157910005757770d17d22-8fa8-48dd-af3a-1702ae32b740.jpg', 'Kygo, The Chainsmokers, Drake, Post Malone', 'files-15791204911863fdf10c4-1587-485a-9f8c-1c574e075619.txt', 'files-15791204911877f23d3c3-0a81-4a22-b669-9be479fe940f.txt', 'files-15791204911845f527c28-0051-4cc1-9a71-5da35622824a.txt', 'files-157912049118670dc525a-9268-464c-b88a-804a43c87e96.txt', 0, 0),
(156, 'Hawaiifest med Online', 'Møt opp i baris, dette skal bli en syk fest med Simon i baris. Ny garderobegaranti og bra stemning', '2021-04-09 20:00:00', 'Høgskoleparken', 3, 'files-157916517045368546381-6828-4517-854b-503e8ec6bc4f.jpg', 'Simon og Martin', 'files-157916517045230b0c7be-6191-4f28-9a1d-8ef1d3689520.txt', 'files-1579165170452d2cc8aea-ab9c-4632-bf02-69be587efc9d.txt', 'files-15791651704510744a52f-2611-4f38-87c4-05b050029939.txt', 'files-1579165170452f151a2c4-1b6e-4770-a11d-15fd8d2eb424.txt', 0, 0),
(157, 'Halloweenfest med Tihlde', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor libero eget turpis bibendum fringilla. Sed a aliquam arcu. Nullam vel sem sit amet tortor facilisis vestibulum ut sed justo. Sed vel finibus arcu. Sed pellentesque, augue non molestie laoreet, purus nisi consequat arcu, non venenatis risus elit vitae purus. Etiam consequat at massa eu hendrerit. Integer at imperdiet urna, at tincidunt mauris. Vestibulum nisi neque, ornare et euismod at, efficitur in sem.', '2020-09-11 18:00:00', 'Rockheim', 1, 'files-1579165578340bd8bee89-b317-485b-b16e-1b2805dbebb4.jpg', 'Max', 'files-1579165578338721cc9f8-c8a7-470b-92e7-c39690a5798d.txt', 'files-157916557833982c1a0fb-1d33-40fb-9861-0e4bad317b45.txt', 'files-1579165578336a459338f-5027-45cd-9c8c-d00a9c6d80d7.txt', 'files-1579165578338350279c3-cc1a-47fd-a159-1213ec4969a4.txt', 0, 0),
(158, 'Hundekos', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor libero eget turpis bibendum fringilla. Sed a aliquam arcu. Nullam vel sem sit amet tortor facilisis vestibulum ut sed justo. Sed vel finibus arcu. Sed pellentesque, augue non molestie laoreet, purus nisi consequat arcu, non venenatis risus elit vitae purus. Etiam consequat at massa eu hendrerit. Integer at imperdiet urna, at tincidunt mauris. Vestibulum nisi neque, ornare et euismod at, efficitur in sem.\r\n\r\nPraesent ornare massa nec varius efficitur. Proin non imperdiet erat. Maecenas tellus sem, interdum at ante nec, condimentum mollis elit. Ut tristique in ante eu pharetra. Sed cursus ligula quis eros tempor, eu maximus orci fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eros erat, efficitur eget pulvinar non, mattis at nibh. Mauris sit amet dolor nisi. Nam vestibulum suscipit sem et pretium. Etiam lobortis tellus a ante pulvinar tincidunt. Pellentesque sit amet orci imperdiet, vulputate dolor sit amet, dignissim elit. Cras molestie ipsum nec semper blandit. Etiam imperdiet iaculis lacinia.', '2020-01-16 20:00:00', 'Sukkerhuset', 1, 'files-157912049118706fecd6c-79d2-4499-bb89-c2384423fc6a.jpg', 'Per', 'files-15791204911863fdf10c4-1587-485a-9f8c-1c574e075619.txt', 'files-15791204911877f23d3c3-0a81-4a22-b669-9be479fe940f.txt', 'files-15791204911845f527c28-0051-4cc1-9a71-5da35622824a.txt', 'files-157912049118670dc525a-9268-464c-b88a-804a43c87e96.txt', 0, 0),
(159, 'Vålerenga', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor libero eget turpis bibendum fringilla. Sed a aliquam arcu. Nullam vel sem sit amet tortor facilisis vestibulum ut sed justo. Sed vel finibus arcu. Sed pellentesque, augue non molestie laoreet, purus nisi consequat arcu, non venenatis risus elit vitae purus. Etiam consequat at massa eu hendrerit. Integer at imperdiet urna, at tincidunt mauris. Vestibulum nisi neque, ornare et euismod at, efficitur in sem.\r\n\r\nPraesent ornare massa nec varius efficitur. Proin non imperdiet erat. Maecenas tellus sem, interdum at ante nec, condimentum mollis elit. Ut tristique in ante eu pharetra. Sed cursus ligula quis eros tempor, eu maximus orci fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eros erat, efficitur eget pulvinar non, mattis at nibh. Mauris sit amet dolor nisi. Nam vestibulum suscipit sem et pretium. Etiam lobortis tellus a ante pulvinar tincidunt. Pellentesque sit amet orci imperdiet, vulputate dolor sit amet, dignissim elit. Cras molestie ipsum nec semper blandit. Etiam imperdiet iaculis lacinia.', '2020-01-06 15:00:00', 'Kristiansand', 1, 'files-157910005757770d17d22-8fa8-48dd-af3a-1702ae32b740.jpg', 'Kygo, The Chainsmokers, Drake, Post Malone', 'files-15791204911863fdf10c4-1587-485a-9f8c-1c574e075619.txt', 'files-15791204911877f23d3c3-0a81-4a22-b669-9be479fe940f.txt', 'files-15791204911845f527c28-0051-4cc1-9a71-5da35622824a.txt', 'files-157912049118670dc525a-9268-464c-b88a-804a43c87e96.txt', 0, 0),
(160, 'Hawaiifest med Online', 'Møt opp i baris, dette skal bli en syk fest med Simon i baris. Ny garderobegaranti og bra stemning', '2020-01-16 20:00:00', 'Høgskoleparken', 3, 'files-157916517045368546381-6828-4517-854b-503e8ec6bc4f.jpg', 'Simon og Martin', 'files-157916517045230b0c7be-6191-4f28-9a1d-8ef1d3689520.txt', 'files-1579165170452d2cc8aea-ab9c-4632-bf02-69be587efc9d.txt', 'files-15791651704510744a52f-2611-4f38-87c4-05b050029939.txt', 'files-1579165170452f151a2c4-1b6e-4770-a11d-15fd8d2eb424.txt', 0, 0),
(161, 'Halloweenfest med Tihlde', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor libero eget turpis bibendum fringilla. Sed a aliquam arcu. Nullam vel sem sit amet tortor facilisis vestibulum ut sed justo. Sed vel finibus arcu. Sed pellentesque, augue non molestie laoreet, purus nisi consequat arcu, non venenatis risus elit vitae purus. Etiam consequat at massa eu hendrerit. Integer at imperdiet urna, at tincidunt mauris. Vestibulum nisi neque, ornare et euismod at, efficitur in sem.', '2020-01-16 18:00:00', 'Rockheim', 1, 'files-1579165578340bd8bee89-b317-485b-b16e-1b2805dbebb4.jpg', 'Max', 'files-1579165578338721cc9f8-c8a7-470b-92e7-c39690a5798d.txt', 'files-157916557833982c1a0fb-1d33-40fb-9861-0e4bad317b45.txt', 'files-1579165578336a459338f-5027-45cd-9c8c-d00a9c6d80d7.txt', 'files-1579165578338350279c3-cc1a-47fd-a159-1213ec4969a4.txt', 0, 0),
(162, 'Julebord med Tihlde', 'Julebord!!!!!!!!!', '2020-01-18 16:00:00', 'Rockheim', 3, 'files-15791680110431ffe2088-ff1d-437a-ac61-080ad76ddc4a.jpg', 'Simon og Martin', 'files-15791680110410ade1dd7-94ab-4ba3-9989-55e0ab6da744.txt', 'files-157916801104211b81a3e-a08a-46d4-bd54-0f0538ac9f84.txt', 'files-1579168011041e3fc1748-c914-4fea-88d6-c6556555b4d0.txt', 'files-15791680110415099be46-ecc4-4585-9351-2210eac2f9a3.txt', 0, 0),
(163, 'tester nytt kategori oppsett', 'heisann', '2020-02-13 20:00:00', 'Berg studentby', 2, 'files-1579199125093e93b07bc-53a0-4553-b1d7-f4857539950c.jpg', 'Lisa', 'files-15791991249994cb82d21-df9f-48d8-a31a-b9ccb88b61ae.jpg', 'files-1579199125046723f9497-bba8-4582-ad40-0027337cf6d8.jpg', 'files-157919912486782a2bdc8-243e-4ad2-94e0-706c1f5a5f05.jpg', 'files-157919912495256fca28e-82c6-42e0-a58b-ad0f49528d81.jpg', 0, 1),
(164, 'ny test', 'tester kategori valg i registrer', '2020-01-31 18:00:00', 'hjemme', 1, 'files-15792059920950a476f1d-be1d-45cd-82e1-304ffb444c37.jpg', 'meg', 'files-1579205990939ebf87207-78b9-4e8d-bee0-6fc07916bad5.jpg', 'files-15792059914888a394da3-998e-457f-8050-d7aa31086228.jpg', 'files-1579205990130698814e3-84e5-412f-afd6-df88e09cdf6f.jpg', 'files-1579205990479b6ed68c4-8148-4e19-ad00-b47b86927710.jpg', 0, 10),
(165, 'test etter push just in case', 'kjphjhøk', '2020-01-17 00:00:00', 'Sukkerhuset', 3, 'files-157920630069317a12667-f88c-4604-a0e2-8bda1f0730ff.jpg', 'hiojlkmø,m', 'files-157920629938631dca15b-5f1c-4edc-a6df-c343233457b6.jpg', 'files-157920629982282509e40-a571-4087-b42c-67f2d797e8c4.jpg', 'files-1579206299265f09f7471-4d40-43e3-af4a-93eac04161cf.jpg', 'files-1579206299373189b68e8-fd72-4471-bf6f-fece48e4c1ef.jpg', 0, 1),
(167, 'Funker dette', 'asd', '2020-01-17 20:00:00', 'd', 1, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', 'dasd', '', '', '', '', 0, 1),
(168, 'test123', '123', '2020-01-16 20:19:00', 'Sukkerhuset', 2, 'files-15792506712689c2e3b22-2322-4f0b-875c-0fefe531eac1.jpg', '123', 'files-1579250671257a1933eee-431e-4bee-b969-4ea2d00e13bb.jpg', 'files-15792506712585dfbe7be-9b57-4048-afc8-b16f4c7a9d80.jpg', 'files-1579250671243b979dd68-ea08-44ec-96b1-39ae19aaf510.jpg', 'files-15792506712480fd4951a-bf98-4468-b513-2b5362b5f2b4.jpg', 0, 1),
(169, 'asdkm', 'daksm', '2020-01-17 20:00:00', 'dkm', 3, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', 'kmdaskd', '', '', '', '', 0, 1),
(170, 'name', 'description', '2020-01-31 18:00:00', 'place', 1, 'img', 'artists', 'tech', 'hosp', 'contract', 'personnel', 0, 1),
(171, 'name', 'description', '2020-01-31 18:00:00', 'place', 1, 'img', 'artists', 'tech', 'hosp', 'contract', 'personnel', 0, 1),
(172, 'Edit test', 'test', '2020-01-17 20:00:00', 'test', 2, 'https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg', 'test', '', '', '', '', 0, 1);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Event_Ticket`
--

DROP TABLE IF EXISTS `Event_Ticket`;
CREATE TABLE `Event_Ticket` (
  `event_id` int(11) NOT NULL,
  `ticket_category_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Event_Ticket`
--

INSERT INTO `Event_Ticket` (`event_id`, `ticket_category_id`, `price`, `number`) VALUES
(154, 1, 0, 1000),
(154, 2, 0, 50),
(154, 3, 0, 10),
(162, 3, 0, 500),
(163, 2, 0, 7),
(165, 3, 0, 40),
(167, 1, 0, 10),
(168, 1, 0, 1),
(168, 2, 0, 45),
(169, 1, 0, 10);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Role`
--

DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role` (
  `role_id` int(11) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Role`
--

INSERT INTO `Role` (`role_id`, `role`) VALUES
(1, 'admin'),
(2, 'Sceneansvarlig'),
(3, 'Økonomisjef'),
(4, 'Barsjef'),
(5, 'Bartender'),
(6, 'Handyman'),
(7, 'Fotograf'),
(8, 'Markedsfører'),
(9, 'SoMe-ansvarlig'),
(10, 'Ølbrygger'),
(11, 'Lydteknikker'),
(12, 'Lystekniker'),
(13, 'Scenerigger'),
(14, 'Artistbooker'),
(15, 'Artistkontakt'),
(16, 'Konseptutvikler'),
(17, 'Quizmaster'),
(18, 'Festplanlegger');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Ticket_Category`
--

DROP TABLE IF EXISTS `Ticket_Category`;
CREATE TABLE `Ticket_Category` (
  `ticket_category_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Ticket_Category`
--

INSERT INTO `Ticket_Category` (`ticket_category_id`, `name`) VALUES
(1, 'Standard'),
(2, 'Gratis'),
(3, 'VIP'),
(4, 'GoldenCircle'),
(5, 'EarlyBird');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `profile_photo` longtext,
  `password_hash` varchar(128) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `approved` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `User`
--

INSERT INTO `User` (`user_id`, `name`, `email`, `phone`, `profile_photo`, `password_hash`, `role_id`, `approved`) VALUES
(8, 'Max Torre Schau', 'max.torre.schau@gmail.com', '91782159', NULL, '$2b$10$ityVa1k/ibZ4hkIBhbg7V.REXvXszmuDdA2MAPT5x/giO9IyF3W4q', 1, 1),
(9, 'test1', '123@test.no', '12345674', NULL, '$2b$10$oPCtD3eqdQgs7s3s7Ka5yep4o14DGIPMamngOs/5u/a0l6l3cT/a2', 1, 1),
(10, 'Test testesen', 'test@test.no', '88776699', NULL, '$2b$10$Mn79jowVfZcSmaOoV2AnYuoxXspmDzB2LB1gTBE4Xg/3kRUXvdjvC', 11, 1),
(14, 'Mathias', 'mat@gmail.com', '98787987', NULL, '$2b$10$njfCTwcLXEkOC.AoHsesJOygponUaIQo52DnvLMOQbvr30bmQ25q6', 1, 1),
(16, 'Martin Johannes Nilsen', 'mjn@icloud.com', '12345678', NULL, '$2b$10$ytBok0.OQt7RYSVkaT07qe2d2UxrbywjNaleiWtASum6Bc3q2JNYK', 1, 1),
(22, 'Lisa', 'lisawil@stud.ntnu.no', '45426999', NULL, '$2b$10$Q/ZCyTqb6QSuuoWxYeWx0eehkoGow2ypM7dQrI3DHN2ZpIDaQTOXS', 9, 1),
(24, 'Randi', 'lisa.willa.lw@gmail.com', '91170702', NULL, '$2b$10$/Kx7glttzqOMCC4JiGvtzeNZ2TMmf6cI/XFQPZU2liD4Jc4SHiMWm', NULL, 1),
(30, 'halla', 'halla@noe.com', '12121212', NULL, '$2b$10$9VbJQJWOmufWrUfSbDtaReDpPvPK2OG6mEojHiQR52F3ygPBFcBK6', NULL, 0),
(35, 'HEI', 'testhest@hest.hest', '99999999', NULL, '$2b$10$6QHO9BOQk9CVh9AIDD8Rh.mSYQ665RyjN3xWrEsHAxzJPwFjHQ4O6', NULL, 1),
(36, 'jhjhjh', 'n@n.n', '88888888', NULL, '$2b$10$NxaTt18KorO2cXulBjnky.DsZuMPFti5oTdyHlQQNUrU9VdXqyFuO', 1, 1),
(38, 'Helene Jonson', 'helene0211@hotmail.com', '23456789', NULL, '$2b$10$pkC/C0iwv7z4Z0Zidc9C9OC.JCtwA932yK4U0u5H6HQxi/qD0RDdi', 1, 1),
(39, 'Simond', 'simon.aardal@hotmail.comd', '90128382d', NULL, '$2b$10$2MmMD/6WxCwiWpZ5P83qpeSs61aD/F6wSj9i10t.9BnWgGPqPRkje', 1, 1),
(40, 'kul123', 'megakul@cool.bruh', '87654321', NULL, '$2b$10$4TgCZpP5b1O.XaCM20R1HuqyjRt/ANTt3sKCfsZepXIZ7EtTJkQw.', NULL, 0),
(42, 'test1', 'test1@tester.no', '12345679', NULL, '3856f5086eb7138f2e4e3d42d8569ce4f4b66a83cbce3192da65ee129e8c01d2832057b4bd8f124a2a47d376de0c1808cabc2e467275cc9f7b8a059d618c04bd', 1, 1),
(43, 'Per', 'per@test.t', '11223344', NULL, '$2b$10$Li5KGZsskyMI9JidbFUPk.jj9t.k.ZKwxd43j5gTtnrokUsFm7IWu', 1, 1),
(46, 'Ola', 'ola@hotmail.com', '57486533', NULL, '$2b$10$6UPbIurG8PVEdiPCZ2RvReTaTpL3lS1E6IwhnyIDf3sdANVNHjetG', 4, 1),
(47, 'Jens Jensen', 'jens@jensen.com', '89898989', NULL, '$2b$10$.9QljE8C7MNFr1DnvgrB4uM3PPI2qvNHNLAW0scHZJl1A3DoXuzT6', 1, 1),
(50, 'Simon', 'simon.aardal@hotmail.com', '47902404', NULL, '$2b$10$ijp/k6KHWzl.VrmyapWpwOPneS8JnKo3fuoWKYcy32FGYtKhaxmhW', 1, 1),
(55, 'Simon', 'simon.aardal@hotmail.com232', '32892323', NULL, '$2b$10$UOIjy.srPvZHaw9S6RJTTu3yq8mVBtyi0DVvBWHw0UZxXdF6Nx2TG', NULL, 0),
(56, 'Sara Hjelle', 'sara@mail.com', '98899919', NULL, '$2b$10$UoBds4EVqYNRJQYOEqZCU.ebqCvQVAu2JrTGnK.834ymef6UElPNO', 4, 1),
(57, 'Ludvig Gundersen', 'fuglekassa@gmail.com', '31415926', NULL, '$2b$10$MB1nkB0PpxWRCe8FJx726.vBW7Xpqk6ZlFkuvjPamSnXA5RkCMbg.', 1, 1),
(58, 'testmann', '6@9.no', '55555555', NULL, '$2b$10$AmBGAZk3ZfQ9L/ueEULVOeBr4hML4JSsbit7HFmQ.dDBaJIwWVHtK', 14, 1),
(62, 'MEG', 'dagartur@live.no', '31245678', NULL, '$2b$10$grhZcBTwS3svB3vkrtTTGu1GipP6iwWerETL1W9z11g79sXbeQuC6', NULL, 0),
(64, 'ijgjgkjbgbg', 'buyyu@spam.com', '44444444', NULL, '$2b$10$XdbtGwgGSCXB6z0TWNj1.edo8lGM.02/EJeVC1vwDsx0F0mDl7LTW', 11, 1),
(66, 'Tomthemage', 'tomthemage@brajj.ru', '13378008', NULL, '$2b$10$5acnpp5TdxN0J9EsTpqSkucBAz1lH8fdlTDE9fc0Ny8E/SePmMdMG', 5, 1),
(67, 'Max Test', 'max@test.no', '12312378', NULL, '$2b$10$.nU4gen2kFR82ZC7N.c0o.ucbP0xs.fbIBhlgAA7opq1qKariI3MO', 4, 1),
(68, 'Martin', 'martinjnilsen@icloud.com', '45005912', NULL, '$2b$10$zaooQhkjo4GyoIzdGs4gSucXp7TlVuM1cRe9TZvwp7mkQPIodAKsG', 4, 1),
(69, 'Simon', 'simon@mail.com', '23232323', NULL, '$2b$10$B7dRirAEFbiAcPkS1GDe9uhsJA8qJqX0a2mtPirQREfnHosGw2gF6', 4, 1),
(71, 'uyygyugy', 'torbjbla@tihlde.org', '34353535', NULL, '$2b$10$w0HEtiGvyU1sSohPA8BJVOjCzW8CnWXu1CWsk.SPDl0aesd7Y.AdO', NULL, 0),
(77, 'supertest', '1234@testern.no', '12312312', NULL, '$2b$10$m8fjwrG8JJkL1hO4OCXjae31VrIotMzkZZaJyUjwr4teY2fMwZT.S', 10, 1),
(81, 'TestPasswodr', 'pass@max.no', '12345879', NULL, '$2b$10$1JyQpABBgD8lHgZ56jiGS.52Bz7fzy8pxnTtMyk7iq0JRq0obOeB.', 10, 1),
(82, 'mr. Arngren', 'tlauvvik@gmail.com', '64656362', NULL, '$2b$10$.oQ7WVHXsorChtEbvR77ZOdwwLRClMwqJALytNNJGDoTjYu9nr49G', 1, 1),
(83, 'Lisa', 'lisa@willa.no', '45426936', NULL, '$2b$10$lanWBjCfeE2tQ6GQH1oNfOYC4oaGOKi6cVO3Dh.Z2XceVNALETW9G', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`event_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Contact_Info`
--
ALTER TABLE `Contact_Info`
  ADD PRIMARY KEY (`contact_info_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `Event`
--
ALTER TABLE `Event`
  ADD PRIMARY KEY (`event_id`);
ALTER TABLE `Event` ADD FULLTEXT KEY `name` (`name`,`description`,`place`,`artists`);

--
-- Indexes for table `Event_Ticket`
--
ALTER TABLE `Event_Ticket`
  ADD PRIMARY KEY (`event_id`,`ticket_category_id`),
  ADD KEY `ticket_category_id` (`ticket_category_id`);

--
-- Indexes for table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `Ticket_Category`
--
ALTER TABLE `Ticket_Category`
  ADD PRIMARY KEY (`ticket_category_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Contact_Info`
--
ALTER TABLE `Contact_Info`
  MODIFY `contact_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `Event`
--
ALTER TABLE `Event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `Role`
--
ALTER TABLE `Role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Ticket_Category`
--
ALTER TABLE `Ticket_Category`
  MODIFY `ticket_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`),
  ADD CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Begrensninger for tabell `Contact_Info`
--
ALTER TABLE `Contact_Info`
  ADD CONSTRAINT `Contact_Info_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
