<?php

/**
 * Copyright 2016 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

class SummitVideoOpenGraphObjectExtension extends PageOpenGraphObjectExtension
{
    public function AbsoluteLink()
    {
        return Director::absoluteURL($this->owner->getLink());
    }

    public function getOGDescription()
    {
        return strip_tags($this->owner->getSocialSummary());
    }

    public function getOGTitle()
    {
        return strip_tags($this->owner->getTitle());
    }

    public function getOGImage()
    {
        return 'https://img.youtube.com/vi/'.$this->owner->YouTubeID.'/mqdefault.jpg'; 
    }

}