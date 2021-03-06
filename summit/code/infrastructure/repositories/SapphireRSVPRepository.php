<?php
/**
 * Copyright 2015 OpenStack Foundation
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

/**
 * Class SapphireRSVPRepository
 */
class SapphireRSVPRepository
    extends SapphireRepository
    implements IRSVPRepository {

    public function __construct(){
        parent::__construct(new RSVP());
    }

    /**
     * @param int $event_id
     * @param int $member_id
     * @return IRSVP|null
     */
    public function getByEventAndMember($event_id, $member_id)
    {
        $query = new QueryObject();
        $query->addAndCondition(QueryCriteria::equal('EventID', $event_id));
        $query->addAndCondition(QueryCriteria::equal('SubmittedByID', $member_id));
        return $this->getBy($query);
    }

    /**
     * @param int $event_id
     * @param int $page
     * @param int $page_size
     * @return IRSVP|null
     */
    public function getByEventPaged($event_id, $page, $page_size)
    {
        $query = new QueryObject();
        $query->addAndCondition(QueryCriteria::equal('EventID', $event_id));
        $query->addOrder(QueryOrder::asc('LastEdited'));
        $offset = ($page-1) * $page_size;
        return $this->getAll($query, $offset, $page_size);
    }

    /**
     * @param int $event_id
     * @param string $seat_type
     * @return IRSVP[]
     */
    public function getByEventAndType($event_id, $seat_type = null)
    {
        $query = new QueryObject();
        $query->addAndCondition(QueryCriteria::equal('EventID', $event_id));
        if ($seat_type) {
            $query->addAndCondition(QueryCriteria::equal('SeatType', $seat_type));
        }

        return $this->getAll($query);
    }

}