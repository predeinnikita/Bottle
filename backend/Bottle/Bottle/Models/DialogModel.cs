﻿using Bottle.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class DialogModel
    {
        public DialogModel()
        {

        }

        public DialogModel(Dialog dialog)
        {
            Id = dialog.Id;
            BottleId = dialog.BottleId;
            BottleOwnerId = dialog.BottleOwnerId;
            RecipientId = dialog.RecipientId;
            Active = dialog.Active;
        }

        public int Id { get; set; }
        public int? BottleId { get; set; }
        public int BottleOwnerId { get; set; }
        public int RecipientId { get; set; }
        public bool Active { get; set; }
    }
}
