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
class PushNotificationMigration extends AbstractDBMigrationTask
{
    protected $title = "PushNotificationMigration";

    protected $description = "PushNotificationMigration";

    function doUp()
    {
        global $database;

        if (DBSchema::existsColumn($database, 'SummitPushNotification', 'Message')) {

            DBSchema::dropColumn($database, 'SummitPushNotification', 'Message');
        }

        if (DBSchema::existsColumn($database, 'SummitPushNotification', 'IsSent')) {

            DBSchema::dropColumn($database, 'SummitPushNotification', 'IsSent');
        }

        if (DBSchema::existsColumn($database, 'SummitPushNotification', 'SentDate')) {

            DBSchema::dropColumn($database, 'SummitPushNotification', 'SentDate');
        }

        if (DBSchema::existsColumn($database, 'SummitPushNotification', 'OwnerID')) {

            DBSchema::dropColumn($database, 'SummitPushNotification', 'OwnerID');
        }

        DBSchema::truncateTable($database, "SummitPushNotification");
        DBSchema::truncateTable($database, "SummitPushNotification_Recipients");

    }

    function doDown()
    {
        // TODO: Implement doDown() method.
    }
}