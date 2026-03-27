-- Admin setup objects for SHPE Cornell

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id BIGSERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  performed_by TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_members_net_id ON members(net_id);
CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON attendance(member_id);
CREATE INDEX IF NOT EXISTS idx_attendance_event_id ON attendance(event_id);
CREATE INDEX IF NOT EXISTS idx_attendance_school_year ON attendance(school_year);
CREATE INDEX IF NOT EXISTS idx_events_school_year ON events(school_year);
CREATE INDEX IF NOT EXISTS idx_officer_roles_member_id ON officer_roles(member_id);
CREATE INDEX IF NOT EXISTS idx_officer_roles_school_year ON officer_roles(school_year);

CREATE OR REPLACE FUNCTION admin_set_active_year(
  p_active_year TEXT,
  p_performed_by TEXT,
  p_previous_year TEXT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE settings
  SET active_year = p_active_year
  WHERE id = 1;

  INSERT INTO admin_audit_log (action, performed_by, details)
  VALUES (
    'active_year_updated',
    p_performed_by,
    jsonb_build_object(
      'previousYear', p_previous_year,
      'activeYear', p_active_year
    )
  );
END;
$$;
