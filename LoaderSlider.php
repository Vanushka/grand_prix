<?php
$subscribe = array(
        'ska42018_34.jpeg' => 'Анна Калашникова',
        'ska42018_35.jpeg' => 'Группа Queens',
        'ska42018_36.jpeg' => 'Филипп Киркоров',
        'ska42018_37.jpeg' => 'Елена Князева',
        'ska42018_38.jpeg' => 'Сергей Кристовский со спутницей',
        'ska42018_39.jpeg' => 'Дмитрий Маликов',
        'ska42018_40.jpeg' => 'Дмитрий Маликов',
        'ska42018_41.jpeg' => 'Певица Masha',
        'ska42018_42.jpeg' => 'Надя Ручка',
        'ska42018_43.jpeg' => 'Дмитрий Оленин',
        'ska42018_44.jpeg' => 'Юля Паго',
        'ska42018_45.jpeg' => 'Мария Погребняк',
        'ska42018_46.jpeg' => 'Мария Погребняк',
        'ska42018_47.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_48.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_49.jpeg' => 'Зара',
        'ska42018_50.jpeg' => 'Елена Север, ЮрКисс и ВладиМир',
        'ska42018_51.jpeg' => 'Анна Седокова',
        'ska42018_52.jpeg' => 'Анна Седокова с дочкой Алиной',
        'ska42018_53.jpeg' => 'Анна Седокова с дочкой Алиной',
        'ska42018_54.jpeg' => 'Специальный гость - Софи Эллис-Бекстор',
        'ska42018_55.jpeg' => 'Анастасия Спиридонова',
        'ska42018_56.jpeg' => 'Анастасия Спиридонова',
        'ska42018_57.jpeg' => 'Группа Фабрика',
        'ska42018_58.jpeg' => 'Алёна Шишкова',
        'ska42018_59.jpeg' => 'Алёна Шишкова',
        'ska42018_60.jpeg' => 'ЮрКисс и Алёна Шишкова',
        'ska42018_61.jpeg' => 'ЮрКисс',
        'ska42018_62.jpeg' => 'Маша Вебер',
        'ska42018_63.jpeg' => 'Маша Вебер',
        'ska42018_64.jpeg' => 'ВладиМир',
        'ska42018_65.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_66.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_67.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_68.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_69.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_70.jpeg' => 'Любовь Маляревская',
        'ska42018_71.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_72.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_73.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_74.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_74.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_75.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_76.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_77.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_78.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_79.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_80.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_81.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_82.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',
        'ska42018_83.jpeg' => 'Гости Скачек Гран-при Радио Monte Carlo 2018',

);
$dir = "dist/img/gallery/".$_POST['path'];

$catalog = scandir($dir);
$html = '';
$html = '<ul class="images slider">';
foreach ($catalog as $value) {
        $filename = basename($value);
        $subscribe = isset($subscribes[$filename]) ? $subscribes[$filename] : '';
        if(preg_match('/[a-zA-Z0-9ёЁ\-\_\(\)\+]+\.(jpg|png|jpeg)/i', $value)) {
                $html .= '<li><img src="'.$dir.'/'.$value.'"><div style="text-align: center; margin-top: 4px; font-size: 120%;max-width: 400px;">'.$subscribe.'</div></li>';
        }
}
$html .= '</ul>';
echo $html;
?>
