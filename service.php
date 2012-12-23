<?
// Connects to your Database 
$mysql_host = 'localhost';
$mysql_user = 'faceware';
$mysql_password = 'swoh0720';
$mysql_db = 'faceware';

$callback = $_REQUEST['callback'];

mysql_connect($mysql_host, $mysql_user, $mysql_password) or die(mysql_error()); 
mysql_select_db($mysql_db) or die(mysql_error()); 


$service = $_GET['name'];
$result = null;


switch($service) {
	case 'packlist':
		$result = getPackList();
		break;
	case 'faceitem':
		$result = getFaceItemByPack($_GET['packname'], $_GET['packtype']);
		break;
}


$data = array('rows' =>$result);   
$json = json_encode($data);

if($callback)  
	header('Content-Type: text/javascript, charset=UTF-8');    
else
	header('Content-Type: application/x-json, charset=UTF-8');    
 

echo isset($callback)
    ? "{$callback}($json)"
    : $json;

function getFaceItemByPack($pack_name, $pack_type) {

	switch ($pack_type) {
		case 'event':
			$where = " AND wr_2='".$pack_name."'";		
			break;
		case 'category':
			$where = " AND wr_3='".$pack_name."'";		
			break;
		default:
			$where = "";		
			break;
	}
	$query = "SELECT p.wr_id id, wr_subject model, wr_content descript,".
						" p.wr_1 maker, p.wr_2 event, p.wr_3 category, p.wr_4 tag, p.wr_5 market, p.wr_6 price, ".
						" f.bf_file file, f.bf_width width, f.bf_height height, f.bf_no fileno".
						" FROM g4_write_faceitem p ".
						" INNER JOIN g4_board_file f ON p.wr_id=f.wr_id AND f.bo_table='faceitem' AND f.bf_filesize>0".
						" WHERE p.wr_7 !='true'".$where.
						" ORDER BY p.wr_id DESC, f.bf_no ASC ";	
						
	//echo $query;
	$result = mysql_query($query) or Error(mysql_error());
	$datarows = null;
	$thumbs = null;
	$styles = null;
	$item_id = null;
	if($result) {
		while($rs = mysql_fetch_array($result)) {
			if ($item_id != $rs[0]) {
				if ($pack != null) {
					$pack['styles'] = $styles;
					$pack['thumbs'] = $thumbs;
					$datarows[] = $pack;
				}
				$item_id = $rs[0];
				$styles = null;
				$thumbs = null;
				
				$pack = array(
					'id'=>$rs[0],
					'model'=>$rs['model'],
					'descript'=>$rs['descript'],
					'maker'=>$rs['maker'],
					'event'=>$rs['event'],
					'category'=>$rs['category'],
					'tag'=>$rs['tag'],
					'market'=>$rs['market'],
					'price'=>$rs['price'],
					'thumbs'=>null,
					'styles'=>null
					);
			}
			if ($rs['fileno'] < 5)
							$thumbs[] = array(
				'img'=>'gnuboard4/data/file/faceitem/'.$rs['file'],			
				'width'=>$rs['width'],	
				'height'=>$rs['height'],
 				);
			else		
				$styles[] = array(
				'img'=>'gnuboard4/data/file/faceitem/'.$rs['file'],			
				'width'=>$rs['width'],	
				'height'=>$rs['height'],	
				);
					
							//	var_dump($pack);
		}		
		mysql_free_result($result);
	}
	if ($pack != null) {
		$pack['styles'] = $styles;
		$pack['thumbs'] = $thumbs;
		$datarows[] = $pack;
	}
	
	return $datarows;
}

function getPackList() {
	$query = "SELECT p.wr_id id, wr_subject name, p.wr_1 type, p.wr_2 descript, f.bf_file, f.bf_width width, f.bf_height height".
						" FROM g4_write_pack p ".
						" INNER JOIN g4_board_file f ON p.wr_id=f.wr_id AND f.bo_table='pack' AND f.bf_filesize>0".
						" WHERE p.wr_3 !='true'".
						" ORDER BY p.wr_id DESC, f.bf_no ASC ";	
	//echo $query;
	$result = mysql_query($query) or Error(mysql_error());
	$datarows = null;
	$icons = null;
	$pack_id = null;
	if($result) {
		while($rs = mysql_fetch_array($result)) {
			if ($pack_id != $rs[0]) {
				if ($pack != null) {
					$pack['icons'] = $icons;
					$datarows[] = $pack;
				}
				$pack_id = $rs[0];
				$icons = null;
				$pack = array(
					'id'=>$rs[0],
					'name'=>$rs[1],
					'type'=>$rs[2],
					'descript'=>$rs[3],
					'icons'=>null);
			}
			$icons[] = array(
			'img'=>'gnuboard4/data/file/pack/'.$rs[4],			
			'width'=>$rs[5],	
			'height'=>$rs[6],	
			);		
			//	var_dump($pack);
		}		
		mysql_free_result($result);
	}
	if ($pack != null) {
		$pack['icons'] = $icons;
		$datarows[] = $pack;
	}
	
	return $datarows;
}	
?> 