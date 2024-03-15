import React from "react";
import Avatar from "react-avatar";

import { CiBookmark, CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";

function Post() {
  return (
    <div>
      <div>
        <div className="flex  p-4">
          <Avatar round={true} size="50" />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">Azeem Idrisi</h1>
              <p className="text-gray-500 ml-2">@Azeem_5202</p>
              <p className="text-gray-500 ml-2">. 1m</p>
            </div>
            <div>
              <p>Hello there!</p>
            </div>

            <div className="flex items-center justify-between my-2 ">
              <div className="flex item-center py-1 ">
                <div className="p-2 rounded-full hover:bg-green-100 cursor-pointer ">
                  <GoComment size="16" />
                </div>
                <p className=" mt-1">17</p>
              </div>
              <div className="flex item-center">
                <div className="p-2 rounded-full hover:bg-red-100 cursor-pointer">
                  <CiHeart size="18" />
                </div>
                <p className=" mt-1">235</p>
              </div>
              <div className="flex item-center">
                <div className="p-2 rounded-full hover:bg-blue-100 cursor-pointer">
                  <CiBookmark size="16" />
                </div>
                <p className=" mt-1">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
