<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NoticeBoard;
class NoticeBoardController extends Controller
{
    public function getIndividualNotice(Request $request,$notice_id){
        return $this->ReS(["notice"=>NoticeBoard::find($notice_id)]);
    }
    public function addNoticeBoard(Request $request){
        $request->validate([
            'title'=>'required|string',
            'body'=>'required|string',
            'parent'=>'required|string',
            'staff'=>'required|string',
            'student'=>'required|string',
            'publish'=>'required|string'
        ]);
        $parent = $request->parent == "true" ? 1 : 0;
        $staff = $request->staff == "true" ? 1 : 0;
        $student = $request->student == "true" ? 1 : 0;
        $publish = $request->publish == "true" ? 1 : 0;
        $year_id = $this->getSchoolYearId($request);
        if($request->id)
            $new_notice = NoticeBoard::find($request->id);
        else
            $new_notice = new NoticeBoard;
        $new_notice->title = $request->title;
        $new_notice->body = $request->body;
        $new_notice->parent = $parent;
        $new_notice->staff = $staff;
        $new_notice->student = $student;
        $new_notice->publish = $publish;
        if($request->image != NULL){
            if(!is_string($request->image)){
                $image_url = $this->uploadFile($request->image)['url'];
                $new_notice->image_url = $image_url;
            }
        }
        $new_notice->year_id = $year_id;
        if($request->id)
            $new_notice->update();
        else
            $new_notice->save();
        if($publish == 1){
        }
        if($request->id){
            $data = NoticeBoard::where(["year_id"=>$year_id])->get();
            return $this->ReS(["notices"=>$data,"message"=>"Notice Updated.","notice"=>$new_notice]);
        }else
            return $this->ReS(['message'=>"Notice Add to Notice Board","notice"=>$new_notice]);
    }
    public function getAllNoticeBoard(Request $request){
        $year_id = $this->getSchoolYearId($request);
        $data = NoticeBoard::where(["year_id"=>$year_id])->get();
        return $this->ReS(["notices"=>$data]);
    }
    public function updateIndividualNotice(Request $request){
        dd($request->all());
    }
}
